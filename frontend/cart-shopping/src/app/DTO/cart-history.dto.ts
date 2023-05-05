export class CartDTO {
  idCart!: number;
  idUser!: number;
  emailUser!: string;
  nameUser!: string;
  products!: [{ id: number; title: string; quantity: number }];
}
