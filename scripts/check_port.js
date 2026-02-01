
import net from 'net';

const port = 5000;
const server = net.createServer();

server.once('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`❌ Port ${port} is occupied! A zombie process is likely holding it.`);
    } else {
        console.log(`❌ Error check port ${port}: ${err.message}`);
    }
    process.exit(1);
});

server.once('listening', () => {
    server.close();
    console.log(`✅ Port ${port} is free. The server should be able to start.`);
    process.exit(0);
});

server.listen(port);
