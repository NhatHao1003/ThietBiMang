// Hàm load giỏ hàng từ localStorage
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartBody = $('#cart-body');
    let totalPrice = 0;
  
    cartBody.empty();
  
    cart.forEach((item, index) => {
      let itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;
  
      let row = `
        <tr data-index="${index}">
          <td><img src="${item.image}" alt="${item.name}"></td>
          <td>${item.name}</td>
          <td>${item.price.toLocaleString()}₫</td>
          <td>
            <input type="number" class="form-control quantity-input" min="1" value="${item.quantity}">
          </td>
          <td class="item-total">${itemTotal.toLocaleString()}₫</td>
          <td><span class="btn-remove">&times;</span></td>
        </tr>
      `;
      cartBody.append(row);
    });
  
    $('#total-price').text(totalPrice.toLocaleString() + '₫');
  }
  
  // Hàm cập nhật tổng tiền
  function updateTotal() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;
  
    $('#cart-body tr').each(function (i) {
      let quantity = parseInt($(this).find('.quantity-input').val());
      let price = cart[i].price;
      cart[i].quantity = quantity;
      let itemTotal = price * quantity;
      totalPrice += itemTotal;
      $(this).find('.item-total').text(itemTotal.toLocaleString() + '₫');
    });
  
    localStorage.setItem('cart', JSON.stringify(cart));
    $('#total-price').text(totalPrice.toLocaleString() + '₫');
  }
  
  // Khi thay đổi số lượng
  $(document).on('change', '.quantity-input', function () {
    updateTotal();
  });
  
  // Khi ấn nút Xóa sản phẩm
  $(document).on('click', '.btn-remove', function () {
    let index = $(this).closest('tr').data('index');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); 
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
  });
  
  // Khi ấn nút Thanh toán
  $('#checkout-btn').click(function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
      alert('Giỏ hàng của bạn đang trống!');
    } else {
      alert('Cảm ơn bạn đã mua hàng! Thanh toán thành công.');
      localStorage.removeItem('cart');
      loadCart();
    }
  });
  
  // Load giỏ hàng khi trang được mở
  $(document).ready(function () {
    loadCart();
  });


  // Load đơn hàng vào Modal
function loadOrderSummary() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let summary = $('#order-summary');
    let total = 0;
  
    summary.empty();
  
    cart.forEach(item => {
      let itemTotal = item.price * item.quantity;
      total += itemTotal;
      let row = `
        <tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>${item.price.toLocaleString()}₫</td>
          <td>${itemTotal.toLocaleString()}₫</td>
        </tr>
      `;
      summary.append(row);
    });
  
    $('#total-payment').text(total.toLocaleString() + '₫');
  }
  
  // Khi mở Modal thanh toán
  $('#checkoutModal').on('show.bs.modal', function () {
    loadOrderSummary();
  });
  
  // Xử lý đặt hàng
  $('#checkout-form').submit(function (e) {
    e.preventDefault();
    
    let name = $('#name').val().trim();
    let phone = $('#phone').val().trim();
    let address = $('#address').val().trim();
    let note = $('#note').val().trim();
  
    if (!name || !phone || !address) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
  
    let orderInfo = {
      name,
      phone,
      address,
      note,
      cart: JSON.parse(localStorage.getItem('cart')) || [],
      total: $('#total-payment').text()
    };
  
    console.log("Thông tin đơn hàng:", orderInfo);
  
    alert("Đặt hàng thành công! Cảm ơn bạn đã mua hàng.");
    localStorage.removeItem('cart');
    $('#checkoutModal').modal('hide');
    location.reload(); // Reload lại giỏ hàng
  });
  