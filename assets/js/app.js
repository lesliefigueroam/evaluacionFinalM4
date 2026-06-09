class AdministradorUsuarios {
    constructor(url) {
        this.url = url;
        this.usuarios =[];

        //XHR síncrono: false = espera hasta que llegue respuesta
        const xhr = new XMLHttpRequest();
        xhr.open("GET", this.url, false);
        xhr.send;

        if (xhr.status === 200){
            this.usuarios = JSON.parse(xhr.responseText);
            console.log("Data cargada: ", this.usuarios);
        }
    }

     listarNombres() {
        const nombres = this.usuarios.map(u => u.name);
        console.log("Nombres de usuarios:", nombres);
        return nombres;
  }
}