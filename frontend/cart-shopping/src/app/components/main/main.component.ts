import { Component, OnInit } from '@angular/core';
import { CartDTO } from 'src/app/DTO/cart-history.dto';
import { APIservice } from 'src/app/Services/API.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public carts!: CartDTO[];
  public cartsById!: CartDTO[];
  public id: number = 0;
  loading = false;
  infosCarregadas = false;
  todasInfosCarregadas = false;
  constructor(private apiService: APIservice) {}

  ngOnInit(): void {}

  getAllCarts() {
    this.loading = true;
    this.apiService.getAllCarts().subscribe((result) => {
      this.carts = result;
      this.loading = false;
      this.todasInfosCarregadas = true;
      console.log(this.carts);
    });
  }

  getCartsById() {
    if (this.todasInfosCarregadas === true) {
      this.todasInfosCarregadas = false;
    }
    this.loading = true;
    const id = this.id;
    this.apiService.getCartById(id).subscribe((resultado) => {
      this.cartsById = resultado.Carts;
      this.loading = false;
      this.infosCarregadas = true;
    });
  }
}
