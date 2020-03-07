module.exports = function () {
    return function sse(req, res, next){
        let messageCount;
        req.socket.setTimeout(0);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        messageCount = 0;
        res.sendEvent = function(obj, eventName){
            res.write(`id: ${messageCount}\n`);
            if('string' === typeof eventName) {
                res.write(`event: ${eventName}\n`);
            }
            res.write(`data: ${JSON.stringify(obj)}\n\n`);
            messageCount += 1;
        };
        next();
    };
};