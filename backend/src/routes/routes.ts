import Router from "express";
import axios from "axios";

const router = Router();

const urlCart = "https://fakestoreapi.com/carts";
const urlUsers = "https://fakestoreapi.com/users";
const urlProdu = "https://fakestoreapi.com/products";

const getData = async () => {
  // Obter dados das APIs externas
  const cartAPI = await axios.get(urlCart);
  const usersAPI = await axios.get(urlUsers);
  const producAPI = await axios.get(urlProdu);

  // Formatar os dados em objetos
  const carts = cartAPI.data;
  const users = usersAPI.data;
  const products = producAPI.data;

  const dados = [];
  carts.forEach((cart) => {
    const objeto = {
      idCart: cart.id,
      idUser: Number,
      emailUser: String,
      nameUser: String,
      products: [],
    };
    const usuario = users.find((m) => m.id === cart.userId);
    if (usuario) {
      objeto.emailUser = usuario.email;
      objeto.idUser = usuario.id;
      objeto.nameUser = usuario.name.firstname;
    }

    carts.forEach((element) => {
      element.products.forEach((product) => {
        const produtos = products.find((l) => l.id === product.productId);
        if (product.productId === produtos.id && objeto.idCart === element.id) {
          objeto.products.push({
            id: produtos.id,
            title: produtos.title,
            quantity: product.quantity,
          });
        }
      });
    });
    //console.log(objeto);

    dados.push(objeto);
  });
  return dados;
};

router.get("/cart-history", async (req, res) => {
  const filtro = await getData();

  res.send(filtro);
});

router.get("/cart-history/:id", async (req, res) => {
  const idParams = req.params.id;

  const dataFiltered = await getData();
  const newFilter = [];

  dataFiltered.forEach((item) => {
    const dados = { ...item };
    if (item.idUser === parseInt(idParams)) {
      dados.idCart = dados.idCart;
      dados.idUser = dados.idUser;
      newFilter.push(dados);
    }
  });
  console.log(newFilter);

  const cartsFilteredById = {
    Carts: newFilter,
  };
  res.send(cartsFilteredById);
});

export default router;
