//====================================
[Authentification PassportJS avec des SESSIONS]
	http://passportjs.org
	npm install passportjs (à vérifier!)
	npm install passport (ok)
	npm install passport-local (ok)
	npm install express-session (ok)

	Utilisation de PassportJS et des Sessions

	1. (client to server) Login + password
	2. (server to client) Envoi d'un cookie (avec date d'expiration)
	3. (client to server)  Demande de ressource + cookie
	4. (server) Vérification du cookie
	5. (server to client) Envoi de la ressource demandée

Étape 1 : inclusion des modules requis et configuration

	const bodyParser = require('body-parser');
	const session = require('express-session');
	const passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

	app
		.use(express.static(__dirname))
		.use(bodyParser.urlencoded({ extended: false })) // <----- Required for Passport (but not mentioned in the docs)
		.use(session({  // Enabling Express sessions via browser cookie
			secret: '1234567890QWERTY'
		}))
		.use(passport.initialize()) // <---------------- Don't forget this!!
		.use(passport.session()) // Place this AFTER express.use(session())
		
		
Étape 2 : formulaire de login


<form action="/login" method="post">
	<div>
		<label>Username:</label>
		<input type="text" name="username" value="jer" />
	</div>
	<div>
		<label>Password:</label>
		<input type="password" name="password" value="toto"/>
	</div>
	<div>
		<input type="submit" value="Submit" />
	</div>
</form>




Étape 3 : réception des identifiants sur le serveur et utilisation de la stratégie 'local' de Passport


	app.post('/login', passport.authenticate('local', {
		successRedirect: '/secret',
		failureRedirect: '/badLogin'
	}));

	
Étape 4 : définition de la stratégie locale de Passport
	passport.use(new LocalStrategy( // Reminder : LocalStrategy = require('passport-local').Strategy
		(username, password, done) => {
			let user = User.find(username, password);
			done(false, user || false); // 1st argument = error, 2nd argument = user found?
		}
	));

Étape 5 : quand une ressource (page HTML…) est demandée, utilisation d'un middleware d'authentification
	.get(
		'/secret',
		passport.authenticationMiddleware(),
		(req, res) => {
			console.log("Should not see me unless logged in")
			res.sendFile(__dirname + '/secret.html')
		}
	)

Étape 6 : définition du middleware d'authentification
	passport.authenticationMiddleware = () => {
		return (req, res, next) => {
			if (req.isAuthenticated()) {
				console.info("Auth middleware : authorised :)")
				return next()
			}
			console.error("Auth middleware : not auth!")
			res.redirect('/login')
		}
	}
	
	
Étape 7 : Serialize / deserialize, requis quand on utilise la méthode "session"
	passport.serializeUser(function (user, done) {
		console.log("serializeUser")
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		/* MONGO
		User.findById(id, function (err, user) {
			console.log("deserialized user", user)
			done(err, user);
		});
		*/
		let user = User.findById(id)
		console.log("deserialized user", user)
		done(false, user || false)
	});



//====================================
