import { readdir } from "fs/promises";
import { existsSync, writeFileSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const newUploadFolder = () => {
    try {
        const folderPath = path.join(__dirname, "../uploads");
        if (!existsSync(folderPath)) mkdirSync(folderPath);
    } catch (error) {
        console.error("No se pudo crear la carpeta de subidas", error.message);
    }
};

export const newTemplate = () => {
    try {
        const folderPath = path.join(__dirname, "../templates");
        const templatePath = path.join(folderPath, "Plantilla1.html");
        let content = null;

        // Crear la carpeta si no existe
        if (!existsSync(folderPath)) mkdirSync(folderPath);

        if (!existsSync(templatePath)) {
            content = `
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>_affair</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
            }
            h1 {
                color: _color;
                text-align: center;
                margin-top: 2rem;
            }
            p {
                text-align: center;
                margin: 2rem 0;
                font-size: large;
            }
            img.banner {
                display: block;
                margin: 0 auto;
                width: 95%;
            }
            a {
                margin: 0;
                font-size: large;
                font-weight: bold;
            }
            p.o {
                margin: 0;
            }
            a.facebook {
                margin-right: 1rem;
                color: #1877f2;
            }
            a.whatsapp {
                margin-left: 1rem;
                color: #25d366;
            }
        </style>
    </head>
    <body>
        <h1>_affair</h1>
        <p>_message</p>
        <img src="cid:uploadedImage" alt="imagen" class="banner" />
        <!-- <img src="cid:uploadedImage" alt="imagen" /> -->
        <p>¿Tienes dudas o necesitas ayuda?</p>
        <p>Haz click en los siguientes enlaces:</p>
        <p>
            <a href="#" class="facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#1877f2" class="bi bi-facebook" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                </svg>
                Búscanos en Facebook ↗︎
            </a>
            <span class="o">o</span>
            <a href="#" class="whatsapp">
                <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#25d366" class="bi bi-whatsapp" viewBox="0 0 16 16">
                    <path
                        d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"
                    />
                </svg>
                Escríbenos por WhatsApp ↗︎
            </a>
        </p>
    </body>
</html>
`;

            // Crear el archivo con el contenido básico
            writeFileSync(templatePath, content, "utf8");
            console.debug("Plantilla creada con éxito");
        } else console.debug("Plantillas cargadas con éxito");
    } catch (error) {
        console.error("Error al crear la plantilla", error.message);
    }
    newUploadFolder();
};

export const getTemplates = async () => {
    try {
        const folderPath = path.join(__dirname, "../templates");
        if (!existsSync(folderPath)) {
            throw new Error("La carpeta de plantillas no existe");
        }

        const files = (await readdir(folderPath)).filter((file) => file.endsWith(".html"));
        const templates = await Promise.all(
            files.map((file) => {
                return { fileName: file };
            })
        );

        return JSON.stringify(templates);
    } catch (error) {
        console.error("Error al obtener las plantillas", error.message);
        return JSON.stringify({ error: error.message });
    }
};
