class ModelProduct {
  products = [];
  async getAllProducts(productsArray, limit, page, query, sort) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let filteredArray = [...productsArray];

    if (typeof query === 'string') {
      filteredArray = filteredArray.filter((product) => product.status === query || product.category === query);
    }

    const totalItems = filteredArray.length;

    const sortedArray = this.validateSort(sort)([...filteredArray]); // Clonar y ordenar el array

    const productsOnPage = sortedArray.slice(startIndex, endIndex);

    return {
      docs: productsOnPage,
      totalDocs: totalItems,
      limit: limit,
      page: page,
      totalPages: Math.ceil(totalItems / limit),
    };
  }

  async getProduct(id) {
    let product = product.find(u => u.id === id);
    return product;
  }

  async createProduct(title, description, code, price, status, stock, category, thumbnails,owner="admin") {
    const productcreated={
        title:title,
        description:description,
        code:code,
        price:price,
        status:status,
        stock:stock,
        category:category,
        thumbnails:thumbnails,
        id:Math.random()*100000000,
        owner:owner
    }
    this.products.push(productcreated);
    return productcreated;
  }

  async updateProduct(id, title, description, code, price, status, stock, category, thumbnails) {
    let product = this.products.find(u => u.id === id);
    product.title=title
    product.description=description
    product.code=code
    product.price=price
    product.status=status
    product.stock=stock
    product.category=category
    product.thumbnails=thumbnails    
    this.products=this.products.filter(u => u.id !== id).push(product)
    return product;
  }

  async deleteProduct(id,user) {
    const deleted = this.products.filter(u => u.id !== id);
    return deleted;
  }
}

export const modelProduct = new ModelProduct();