import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 8080;

const handleListening = () =>
	console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
