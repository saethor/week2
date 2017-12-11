module.exports=function(injected){

    const dbPool = injected('dbPool');
    const commandRouter = injected('commandRouter');
    const eventRouter = injected('eventRouter');

    let repo = {

        cleanDatabase:function(cmdObj, errCb, successCb){
            console.debug("server/socket-app/apitest-dbbackdoor.js;10: repo.cleanDatabase(" + JSON.stringify(cmdObj) + ", errCb, successCb)");        
        
            dbPool.connect(function(err, connection, done) {
                if(err) {
                    return console.error('error fetching db connection from pool', err);
                }

                console.debug("celaning eventlog")
                let statement = 'DELETE FROM eventlog';
                let statementParams = [];
                console.warn(statement);
                connection.query(statement,statementParams, function(err, result) {
                    //call `done()` to release the client back to the pool
                    if(err) {
                        errCb('error executing statement ' + err + ", params:" + statementParams);
                    } else {
                        eventRouter.routeMessage({eventId:"eventLogCleaned", type:"tableCleaned", tableName:"eventlog"});
                    }
                });



                statement = "DELETE FROM commandlog";
                console.warn(statement);
                connection.query(statement,statementParams, function(err, result) {
                    //call `done()` to release the client back to the pool
                    done();

                    if(err) {
                        errCb('error executing statement ' + err + ", params:" + statementParams);
                    } else {
                        eventRouter.routeMessage({eventId:"commandLogCleaned", type:"tableCleaned", tableName:"commandlog"});
                        successCb();
                    }
                });
            });

        }
    };

    commandRouter.on('cleanDatabase', function(commandObj){
        console.debug("server/socket-app/apitest-dbbackdoor.js;50: commandRouter.on('cleanDatabase', callback)");        
        repo.cleanDatabase(commandObj, function(err){
            eventRouter.routeMessage({type:"databaseCleanError", err:err});
            console.error('Error clearing database tables: ' + err)
        }, function(){
            eventRouter.routeMessage({type:"databaseCleaned"});
        })
    });

    return repo


};