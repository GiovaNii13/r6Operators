export interface User {
    nome: string,
    email: string,
    senha: string,
    opFav: [],
    endereco: {
        cep: string,
        rua: string,
        numero: string,
        bairro: string,
        estado: string,
        cidade: string,
        complemento?: string
    }
}
