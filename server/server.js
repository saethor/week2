function serverModule(injected) {

    let ENV = injected('env');
    let PORT = injected('port');

    const config = require('./config.js')[ENV];

    const Express = require('express');
    const Session = require('express-session');
    const BodyParser = require('body-parser');
    const Path = require('path');
    const SocketIo = require('socket.io');
    const Postgres = require('./db/postgres');
    const DbConfig = require('./database.json');

    const dbConfig = DbConfig[process.env.DB_ENV || 'dev'];

    const ChatAppContext = require('./socket-app/server-app-context');
    const exec = require('child_process').exec;

    return {
        startServer: function(CALLBACK){

            const CookieParser = require('cookie-parser');
            let app = Express();

            const sessionOpts = {
                secret: config.sessionSecret,
                resave: true,
                saveUninitialized: true
            };

            const dbPool = Postgres(inject({config: dbConfig})).pool;

            // Define where our static files will be fetched from:
            app.use(Express.static(Path.join(__dirname, '..', 'static')));

            app.use(BodyParser.json());
            app.use(BodyParser.urlencoded({ extended: true }));

            const cookieParser = CookieParser(config.sessionSecret);
            app.use(cookieParser);

            app.use(Session(sessionOpts));

            
            require('./http-routes/api')(
                inject({app})
            );
            
            app.get('/500', function(req, res){
                foobar;
            });

            app.get('/', function (req, res) {
                // Render index.html in all cases and pass route handling to react
                res.sendFile(Path.join(__dirname,'static','index.html'));
            });
            
            app.use(function(req, res, next){
                // 404 error here
                const datadog = exec('sh ' + Path.join(__dirname, '..', 'datadog.sh 404'));
                next();
            });

            app.use(function(err, req, res, next){
                // 500 error here
                const datadog = exec('sh ' + Path.join(__dirname, '..', 'datadog.sh 500'));
                next(err);
            });
            
            const server = app.listen(PORT, CALLBACK);
            const io = SocketIo(server);

          //  SocketSessionManager(inject({io}));
            console.debug("[SERVER] server/server.js;58: Calling ChatAppContext with io and dbPool");                          
            ChatAppContext(inject({io, dbPool}));
        }
    }
}

module.exports=serverModule;