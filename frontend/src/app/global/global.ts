export class Global{
    //message
    public static genericError:string="Error del servidor ponganse en contacto con el encargado";
    //regex
    public static nameUpper: string = "[A-Z]*"
    public static namesUpperSpace: string = "[A-Z\\s]*"
    public static names: string = "^[a-zA-Z0-9\\s]{5,50}$";
    public static number:string ="[0-9]*"
    public static emailRegex:string ="[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}"
    public static contacNumberRegex:string ="^[0-9]{8,15}$"

    public static error :string = "error"
    //HTTP
    public static apiUrl:string="http://127.0.0.1:8080"
}