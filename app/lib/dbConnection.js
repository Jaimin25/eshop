const { username, password } = process.env;
export const connectionSrv = `mongodb+srv://Jaimin25:${password}@cluster0.dmujwf0.mongodb.net/usersDB?retryWrites=true&w=majority`;
