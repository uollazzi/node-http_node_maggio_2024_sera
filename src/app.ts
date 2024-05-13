import { createServer, IncomingMessage, ServerResponse } from "node:http";

const port = 3000;
const host = "localhost";

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    console.log("Richiesta:", req.method, req.url, new Date().toLocaleString());


    res.writeHead(201, { "Content-Type": "application/json" });
    const pippo = {
        nome: "Pippo",
        anni: 59
    }
    res.write(JSON.stringify(pippo));
    res.end();
});

server.listen(port, host, () => console.log(`Server in ascolto su http://${host}:${port}\nPremere CTRL+C per uscire...`));