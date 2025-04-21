$(document).ready(function () {
    // Hiển thị tất cả sản phẩm khi tải trang
    $(".product-item").show();

    // Hiệu ứng loading khi lọc sản phẩm
    function showLoading(callback) {
        $('#product-list').fadeOut(200, function () {
            if (typeof callback === 'function') callback();
            $('#product-list').fadeIn(400);
        });
    }

    // Lọc sản phẩm theo danh mục
    $('.category-card').click(function () {
        $('.category-card').removeClass('border-primary');
        $(this).addClass('border-primary');

        var selectedCategory = $(this).data('category');
        showLoading(function () {
            if (selectedCategory) {
                $('.product-item').hide();
                $('.product-item[data-category="' + selectedCategory + '"]').fadeIn(400);
                $('#show-all-btn').fadeIn();
            } else {
                $('.product-item').fadeIn(400);
                $('#show-all-btn').fadeOut();
            }
        });
    });

    // Hiển thị tất cả sản phẩm
    $('#show-all-btn button').click(function () {
        $('.category-card').removeClass('border-primary');
        showLoading(function () {
            $('.product-item').fadeIn(400);
            $('#show-all-btn').fadeOut();
        });
    });

    // Hiển thị chi tiết sản phẩm ở Modal
    $(".product-item .btn-primary").click(function () {
        var productName = $(this).closest(".product-item").find(".card-title").text();
        var productPrice = $(this).closest(".product-item").find(".card-text").text();
        var productImage = $(this).closest(".product-item").find("img").attr("src");
        var productDescription = "Thông tin chi tiết về sản phẩm...";

        $("#modal-product-name").text(productName);
        $("#modal-product-price").text(productPrice);
        $("#modal-product-image").attr("src", productImage);
        $("#modal-product-description").text(productDescription);

        $("#addToCartBtn").data("product-name", productName);
        $("#addToCartBtn").data("product-price", productPrice);
        $("#addToCartBtn").data("product-image", productImage);

        $('#productDetailModal').modal('show');
    });

    // Thêm vào giỏ hàng
    $("#addToCartBtn").click(function () {
        let quantityInput = $("#quantity");
    let quantity = quantityInput.length ? parseInt(quantityInput.val()) : 1; // Nếu không có #quantity thì mặc định 1

    let productName = $(this).data("product-name");
    let productPrice = parseInt($(this).data("product-price").replace(/\D/g, ''));
    let productImage = $(this).data("product-image");

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: quantity, image: productImage });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");

    $('#productDetailModal').modal('hide');
    });
});
