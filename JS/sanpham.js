$(document).ready(function() {
  function showLoading(callback) {
    $('#product-list').fadeOut(200, function() {
      if (typeof callback === 'function') callback();
      $('#product-list').fadeIn(400);
    });
  }

  $('.category-card').click(function() {
    $('.category-card').removeClass('border-primary');
    $(this).addClass('border-primary');

    var selectedCategory = $(this).data('category');

    showLoading(function() {
      if (selectedCategory) {
        $('.product-item').hide();
        $('.product-item[data-category="' + selectedCategory + '"]').fadeIn(400);
        $('#show-all-btn').fadeIn(); // Hiện nút Hiển thị tất cả
      } else {
        $('.product-item').fadeIn(400);
        $('#show-all-btn').fadeOut(); // Ẩn nút Hiển thị tất cả
      }
    });
  });

  $('#show-all-btn button').click(function() {
    $('.category-card').removeClass('border-primary');
    showLoading(function() {
      $('.product-item').fadeIn(400);
      $('#show-all-btn').fadeOut();
    });
  });
});


$(document).ready(function () {
    // Mặc định hiển thị tất cả sản phẩm khi trang load
    $(".product-item").show();

    // Lọc sản phẩm theo danh mục   
    $(".category-btn").click(function () {
      var category = $(this).data("category"); // Lấy danh mục người dùng click

      // Ẩn tất cả sản phẩm trước khi hiển thị sản phẩm của danh mục chọn
      $(".product-item").hide();

      // Hiển thị sản phẩm theo danh mục đã chọn
      if (category === "all") {
        $(".product-item").show(); // Hiển thị tất cả sản phẩm
      } else {
        $(".product-item[data-category='" + category + "']").show(); // Chỉ hiển thị sản phẩm trong danh mục đó
      }
    });

    // Nút "Hiển thị tất cả sản phẩm"
    $("#showAllProducts").click(function () {
      $(".product-item").show(); // Hiển thị lại tất cả sản phẩm
    });
});
  // modal
$(document).ready(function () {
    // Khi nhấn vào "Xem Chi Tiết", mở Modal và hiển thị thông tin sản phẩm
    $(".product-item .btn-primary").click(function () {
        // Lấy thông tin sản phẩm
        var productName = $(this).closest(".product-item").find(".card-title").text();
        var productPrice = $(this).closest(".product-item").find(".card-text").text();
        var productImage = $(this).closest(".product-item").find("img").attr("src");
        var productDescription = "Thông tin chi tiết về sản phẩm..."; // Bạn có thể thay đổi mô tả

        // Cập nhật thông tin vào modal
        $("#modal-product-name").text(productName);
        $("#modal-product-price").text(productPrice);
        $("#modal-product-image").attr("src", productImage);
        $("#modal-product-description").text(productDescription);

        // Lưu thông tin sản phẩm vào button "Thêm vào Giỏ Hàng"
        $("#addToCartBtn").data("product-name", productName);
        $("#addToCartBtn").data("product-price", productPrice);
        $("#addToCartBtn").data("product-image", productImage);

        // **Hiển thị modal**
        $('#productDetailModal').modal('show');
    });


    $("#addToCartBtn").click(function () {
        var quantity = $("#quantity").val(); // Lấy số lượng người dùng chọn
        var productName = $(this).data("product-name");
        var productPrice = $(this).data("product-price");
        var productImage = $(this).data("product-image");

        // Thêm sản phẩm vào giỏ hàng (Có thể lưu giỏ hàng vào localStorage hoặc backend)
        alert("Đã thêm " + quantity + " sản phẩm " + productName + " vào giỏ hàng!");

        $('#productDetailModal').modal('hide');
    });
});