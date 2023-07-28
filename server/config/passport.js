const passport = require('passport');
const refresh = require('passport-oauth2-refresh');
const axios = require('axios');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: GitHubStrategy } = require('passport-github2');
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');
const { OAuthStrategy } = require('passport-oauth');
const { OAuth2Strategy } = require('passport-oauth');
const _ = require('lodash');
const moment = require('moment');

const User = require('../models/User');

passport.serializeUser((user, done) => {
    console.log(user, user.id)
    done(null, user);
});

passport.deserializeUser(async(id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` });
    }
    if (!user.password) {
        return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' });
    }
    user.comparePassword(password, (err, isMatch) => {
        if (err) { return done(err); }
        if (isMatch) {
            return done(null, user);
        }
        return done(null, false, { msg: 'Invalid email or password.' });
    });
}));

/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */

/*Github*/
try {
    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_ID || "",
        clientSecret: process.env.GITHUB_SECRET || "",
        callbackURL: `${process.env.BASE_URL}/auth/github/callback`,
        passReqToCallback: true,
        scope: ['user:email']
    }, async(req, accessToken, refreshToken, profile, done) => {
        try {
            if (req.user) {
                const existingUser = await User.findOne({ github: profile.id });
                if (existingUser) {
                    req.flash('errors', { msg: 'There is already a GitHub account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
                    done(null, false);
                } else {
                    const user = await User.findById(req.user.id);
                    user.github = profile.id;
                    user.tokens.push({ kind: 'github', accessToken });
                    user.profile.name = user.profile.name || profile.displayName;
                    user.profile.picture = user.profile.picture || profile._json.avatar_url;
                    user.profile.location = user.profile.location || profile._json.location;
                    user.profile.website = user.profile.website || profile._json.blog;
                    await user.save();
                    req.flash('info', { msg: 'GitHub account has been linked.' });
                    done(null, user);
                }
            } else {
                const existingUser = await User.findOne({ github: profile.id });
                if (existingUser) {
                    done(null, existingUser);
                } else {
                    const email = _.get(_.orderBy(profile.emails, ['primary', 'verified'], ['desc', 'desc']), [0, 'value'], null);
                    if (profile._json.email === null) {
                        const existingEmailUser = await User.findOne({ email });
                        if (existingEmailUser) {
                            req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with GitHub manually from Account Settings.' });
                            done(null, false);
                        } else {
                            const user = new User();
                            user.email = email;
                            user.github = profile.id;
                            user.tokens.push({ kind: 'github', accessToken });
                            user.profile.name = profile.displayName;
                            user.profile.picture = profile._json.avatar_url;
                            user.profile.location = profile._json.location;
                            user.profile.website = profile._json.blog;
                            await user.save();
                            done(null, user);
                        }
                    } else {
                        const existingEmailUser = await User.findOne({ email: profile._json.email });
                        if (existingEmailUser) {
                            req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with GitHub manually from Account Settings.' });
                            done(null, false);
                        } else {
                            const user = new User();
                            user.email = email;
                            user.github = profile.id;
                            user.tokens.push({ kind: 'github', accessToken });
                            user.profile.name = profile.displayName;
                            user.profile.picture = profile._json.avatar_url;
                            user.profile.location = profile._json.location;
                            user.profile.website = profile._json.blog;
                            await user.save();
                            done(null, user);
                        }
                    }
                }
            }
        } catch (err) {
            done(err);
        }
    }));
    process.env.PASSPORT_GITHUB = true;
} catch (err) {
    console.log("Passport was unable to configure a strategy for Github OAuth")
    console.log(err)
    process.env.PASSPORT_GITHUB = false;
}

/**
 * Sign in with Google.
 */
try {
    const googleStrategyConfig = new GoogleStrategy({
        clientID: process.env.GOOGLE_ID || "",
        clientSecret: process.env.GOOGLE_SECRET || "",
        callbackURL: '/auth/google/callback',
        passReqToCallback: true
    }, async(req, accessToken, refreshToken, params, profile, done) => {
        try {
            if (req.user) {
                const existingUser = await User.findOne({ google: profile.id });

                if (existingUser && (existingUser.id !== req.user.id)) {
                    req.flash('errors', { msg: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
                    done(null, false);
                } else {
                    const user = await User.findById(req.user.id);
                    user.google = profile.id;
                    user.tokens.push({
                        kind: 'google',
                        accessToken,
                        accessTokenExpires: moment().add(params.expires_in, 'seconds').format(),
                        refreshToken,
                    });
                    user.profile.name = user.profile.name || profile.displayName;
                    user.profile.gender = user.profile.gender || profile._json.gender;
                    user.profile.picture = user.profile.picture || profile._json.picture;
                    await user.save();
                    req.flash('info', { msg: 'Google account has been linked.' });
                    done(null, user);
                }
            } else {
                const existingUser = await User.findOne({ google: profile.id });
                if (existingUser) {
                    done(null, existingUser);
                } else {
                    const existingEmailUser = await User.findOne({ email: profile.emails[0].value });
                    if (existingEmailUser) {
                        req.flash('errors', { msg: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.' });
                        done(null, false);
                    } else {
                        const user = new User();
                        user.email = profile.emails[0].value;
                        user.google = profile.id;
                        user.tokens.push({
                            kind: 'google',
                            accessToken,
                            accessTokenExpires: moment().add(params.expires_in, 'seconds').format(),
                            refreshToken,
                        });
                        user.profile.name = profile.displayName;
                        user.profile.gender = profile._json.gender;
                        user.profile.picture = profile._json.picture;
                        await user.save();
                        done(null, user);
                    }
                }
            }
        } catch (err) {
            done(err);
        }
    });

    passport.use('google', googleStrategyConfig);
    refresh.use('google', googleStrategyConfig);
    process.env.PASSPORT_GOOGLE = false
} catch (err) {
    console.log("Passport was unable to configure a strategy for Google OAuth")
    console.log(err)
    process.env.PASSPORT_GOOGLE = false
}

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        // res.json({ isAuthenticated: true }); // to review
        return next();
    }
    res.redirect(`${process.env.FRONTEND_URL}/login`);
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
    const provider = req.path.split('/')[2];
    const token = req.user.tokens.find((token) => token.kind === provider);
    if (token) {
        // Is there an access token expiration and access token expired?
        // Yes: Is there a refresh token?
        //     Yes: Does it have expiration and if so is it expired?
        //       Yes, Quickbooks - We got nothing, redirect to res.redirect(`/auth/${provider}`);
        //       No, Quickbooks and Google- refresh token and save, and then go to next();
        //    No:  Treat it like we got nothing, redirect to res.redirect(`/auth/${provider}`);
        // No: we are good, go to next():
        if (token.accessTokenExpires && moment(token.accessTokenExpires).isBefore(moment().subtract(1, 'minutes'))) {
            if (token.refreshToken) {
                if (token.refreshTokenExpires && moment(token.refreshTokenExpires).isBefore(moment().subtract(1, 'minutes'))) {
                    res.redirect(`${BASE_URL}/auth/${provider}`);
                } else {
                    refresh.requestNewAccessToken(`${provider}`, token.refreshToken, (err, accessToken, refreshToken, params) => {
                        User.findById(req.user.id, (err, user) => {
                            user.tokens.some((tokenObject) => {
                                if (tokenObject.kind === provider) {
                                    tokenObject.accessToken = accessToken;
                                    if (params.expires_in) tokenObject.accessTokenExpires = moment().add(params.expires_in, 'seconds').format();
                                    return true;
                                }
                                return false;
                            });
                            req.user = user;
                            user.markModified('tokens');
                            user.save((err) => {
                                if (err) console.log(err);
                                next();
                            });
                        });
                    });
                }
            } else {
                res.redirect(`${BASE_URL}/auth/${provider}`);
            }
        } else {
            next();
        }
    } else {
        res.redirect(`${BASE_URL}/auth/${provider}`);
    }
};