import { createServer, IncomingMessage, ServerResponse } from "node:http";
import url from "node:url";
import fs from "node:fs";
import path from "node:path";

const port = 3000;
const host = "localhost";

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    console.log("Richiesta:", req.method, req.url, new Date().toLocaleString());

    try {
        const u = url.parse(req.url!, true);
        const nome = u.query.nome as string;

        switch (u.pathname) {
            case "/":
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end("<html><head><title>Mio Server</title></head><body><h1>Ciao [[nome]]!</h1></body></html>".replace("[[nome]]", nome ?? "a tutti"));
                break;
            case "/api/v2/pippo":
                res.writeHead(201, { "Content-Type": "application/json" });
                const pippo = {
                    nome: "Pippo",
                    anni: 59
                }
                res.write(JSON.stringify(pippo));
                res.end();
                break;
            case "/benvenuto":
                let html = fs.readFileSync(path.join("./templates", "welcome.html"), "utf8");
                html = html.replace("{{name}}", nome ?? "a tutti");
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(html);
                break;
            default:
                res.writeHead(404);
                res.end("Pagina nno trovata.");
                break;

        }
    } catch (error) {
        console.error(error);
        res.writeHead(500);
        // res.write("Errore del server. Riprova più tardi. Non è colpa tua. Ti vogliamo bene lo stesso.");
        res.end("Errore del server. Riprova più tardi. Non è colpa tua. Ti vogliamo bene lo stesso.");
    }
}

const server = createServer(requestListener);
server.listen(port, host, () => console.log(`Server in ascolto su http://${host}:${port}\nPremere CTRL+C per uscire...`));