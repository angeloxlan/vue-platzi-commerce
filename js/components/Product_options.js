export const Product = {
    template: `
        <section class="product">
            <div class="product__thumbnails">
                <div 
                    v-for="(image, index) in product.images"
                    :key="index"
                    :class="{ active: activeImage === index }" 
                    :style="{ backgroundImage: 'url('+image.thumbnail+')' }"
                    class="thumb" 
                    @click="activeImage = index"
                >
                </div>
            </div><!-- .product__thumbnails -->
            <div class="product__image">
                <img :src="product.images[activeImage].image" alt="">
            </div><!-- .product__image -->
        </section><!-- .product -->

        <section class="description">
            <h4>{{ product.name.toUpperCase() }}</h4>
            <span class="badge new" v-if="product.new">Nuevo</span>
            <span class="badge offer" v-if="product.offer">Oferta</span>
            <p class="description__status" v-if="product.stock >= 2 && product.stock <=5">Quedan pocas unidades</p>
            <p class="description__status" v-else-if="product.stock === 1">Ultima unidad</p>
            <p class="description__status" v-else-if="product.stock === 0">Agotado</p>
            <p class="description__price">$ {{ new Intl.NumberFormat('es-MX').format(product.price) }}</p>
            <div class="description__content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem consequatur iure, quas voluptatem quasi ea reiciendis quam expedita placeat mollitia culpa labore nobis ab, et praesentium laudantium consectetur adipisci consequuntur!</div>

            <div class="discount">
                <span>Código de Descuento:</span>
                <input 
                    type="text" 
                    placeholder="Ingresa tu código"
                    @keyup.enter="applyDiscount"
                >
            </div>

            <button 
                :disabled="product.stock === 0"
                @click="addToCart"
            >Agregar al carrito</button>
        </section><!-- .description -->
    `,
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            activeImage: 0,
            discountCodes: ['PLATZI2022', 'PLATZI20'],
        }
    },
    methods: {
        applyDiscount(event) {
            const discountCodeIndex = this.discountCodes.indexOf(event.target.value);
            if ( discountCodeIndex >= 0 ) {
                console.log(event);
                this.product.price *= 50 / 100;
                this.discountCodes.splice(discountCodeIndex, 1);
            }
        },
        addToCart() {
            console.log('here');
            const prodIndex = this.cart.findIndex(product => product.name === this.product.name);
            if ( prodIndex >= 0 ) {
                this.cart[prodIndex].quantity += 1;
            } else {   
                this.cart.push(this.product);
            }
            this.product.stock -= 1;
        }
    }
}