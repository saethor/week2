# Assignments day 11

## Database Clean trace
Before apitest is run a server needs to be initialized with ChatAppContext using the APITestBackdoor, which is subscribed to the cleanDatbase event. When the test dispatches clenDatabase command to the command router the framework will route the message to the back door where the cleanDatabase command is handled. The back door will then clean the eventlog and the commandlog tables and dispatch a databaseCleaned event when it is done which is caught by the event router and sent back to the testApi.

The following is the console output of the trace we performed. Each log command was prefixed with a marker to specify where to find the output and to enable easy grep commands to find them. [SERVER] commands are seen in the server console and [TEST] commands are seen in the test client. We have ordered them in the sequence they should appear.

```
[SERVER] server/server.js;58: Calling ChatAppContext with io and dbPool
[SERVER] server/socket-app/server-app-context.js;78: Initializing APITestBackdoor with dbPool, eventRouter and commandRouter
[TEST] apitest/fluentapi/test-api.js;45: routingContext.commandRouter.routeMessage({commandId: 0, type: "cleanDatabase"})
[FRAMEWORK] client/common/framework/message-router.js;33: messageRouter.routeMessage({"commandId":0,"type":"cleanDatabase"})
[FRAMEWORK] client/common/framework/message-router.js;33: messageRouter.routeMessage({"commandId":0,"type":"cleanDatabase","_session":{"clientId":0,"user":{"userName":"Anonymous#0","userId":0}}})
[SERVER] server/socket-app/apitest-dbbackdoor.js;50: handle cleanDatabase event
[SERVER] server/socket-app/apitest-dbbackdoor.js;10: cleanDatabase called with payload {"commandId":0,"type":"cleanDatabase","_session":{"clientId":0,"user":{"userName":"Anonymous#0","userId":0}}}
DELETE FROM eventlog
[FRAMEWORK] client/common/framework/message-router.js;33: messageRouter.routeMessage({"eventId":"eventLogCleaned","type":"tableCleaned","tableName":"eventlog"})
DELETE FROM commandlog
[FRAMEWORK] client/common/framework/message-router.js;33: messageRouter.routeMessage({"eventId":"commandLogCleaned","type":"tableCleaned","tableName":"commandlog"})
[SERVER] server/socket-app/apitest-dbbackdoor.js;55: dispatching databaseCleaned event
[FRAMEWORK] client/common/framework/message-router.js;33: messageRouter.routeMessage({"type":"databaseCleaned"})
[TEST] apitest/fluentapi/test-api.js;52: testApi.waitForCleanDatabase({"type":"databaseCleaned"})
```

## Push/Pop in user-api.js



## Race conditions in chat.spec.js

## Sequential code in tictactoe-game-player.js

## Tictactoe load test

