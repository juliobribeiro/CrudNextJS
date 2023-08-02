import http from "../http-common";

class CategoriaClienteDataService {
    getAll(){
        return http.get("/categoriaclientes");
    }

    get(id) {
        return http.get(`/categoriaclientes/${id}`);
    }

    create(data) {
        return http.post("/categoriaclientes", data);
    }

    update(id, data){
        return http.put(`/categoriaclientes/${id}`, data);
    }

    delete(id) {
        return http.delete(`/categoriaclientes/${id}`);
    }

    deleteAll(){
        return http.delete("/categoriaclientes");
    }

    findByTitulo(categoria){
        return http.get(`categoriaclientes?categoriacliente=${categoria}`);
    }
}

export default new CategoriaClienteDataService();