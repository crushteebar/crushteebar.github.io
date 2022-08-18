$(function () {
    getData();

    $("a").on("click",function() {
        var id = $(this).data("id");
        var name = $(this).data("name");
        var price = $(this).data("price");

        var item = {
            id: id,
            name: name,
            price: price,
            quantity:1,
        }

        // console.log(item)

        var cartStr = localStorage.getItem('cart');
        if(!cartStr) {
            var itemArr = new Array();
        }else {
            var itemArr = JSON.parse(cartStr)
        }

        var status = false;
        $.each(itemArr, function(i,v) {
            if(v.id == id) {
                v.quantity++;
                status = true;
                return false;
            }
        })

        if(status == false) {
            itemArr.push(item);
        }

        localStorage.setItem('cart', JSON.stringify(itemArr));
        getData();
    })

    function getData() {
        var cartStr = localStorage.getItem('cart');

        if(!cartStr) {
            var data = ``;
            $("#mytable").hide();
            $(".mycart").show();
            $(".mycart").show(data);
        }else {
            var body;
            var cartArr = JSON.parse(cartStr);
            var total = 0;
            var total_qty = 0;
            $.each(cartArr, function (i,v) {
                total += v.quantity*v.price;
                total_qty +=  v.quantity;
                let id = i+1;
                body += `<tr>
                        <td>
                        <button class="delbtn" data-index = "${i}">
                        <i class="fa-solid fa-trash text-danger" style="cursor: pointer"></i>
                        </button>
                        </td>
                        <td>${id}</td>
                        <td>${v.name}</td>
                        <td>${numberFormat(v.price)} Ks.</td>
                        <td style="font-size:15px;">
                        <button class="decreasebtn" data-index = "${i}">
                        <i class="fa-solid fa-circle-minus text-success fs-6" style="cursor: pointer;"></i>
                        </button>
                        ${v.quantity}
                        <button class="increasebtn" data-index = "${i}">
                        <i class="fa-solid fa-circle-plus text-success fs-6" style="cursor: pointer;"></i>
                        </button>
                        </td>
                        <td>${numberFormat(v.quantity*v.price)} Ks.</td>
                        </tr>`
            })

            body += `
                        <tr>
                                <td colspan="4">Total</td>
                                <td>${numberFormat(total_qty)} Q</td>
                                <td>${numberFormat(total)} Ks.</td>
                        </tr>
                    `
                    $(".mycart").hide();
                    $("#cartitems").html(body);
                    $("#mytable").show();
        }
        // ending
    }

    // Decrease
    $("#cartitems").on("click",".decreasebtn",function() {
        var index = $(this).data('index');
        var cartStr = localStorage.getItem('cart');
        var cartArr = JSON.parse(cartStr);
        if(cartArr[index].quantity>1) {
            cartArr[index].quantity--;
        }
        // else{
        //     var status = confirm("Are you sure to Delete?");
        //     if(status == true) {
        //         cartArr.splice(index,1);
        //     }
        // }

        // console.log (cartArr[index]);
        localStorage.setItem('cart', JSON.stringify(cartArr));
        getData();
    })

    // Increase
    $("#cartitems").on("click",".increasebtn",function() {
        var index = $(this).data('index');
        var cartStr = localStorage.getItem('cart');
        var cartArr = JSON.parse(cartStr);
            cartArr[index].quantity++;
        // console.log (cartArr[index]);
        localStorage.setItem('cart', JSON.stringify(cartArr));
        getData();
    })
    
        // Delete
        $("#cartitems").on("click", ".delbtn", function () {
            var index = $(this).data("index");
            let cartStr = localStorage.getItem("cart");
            var cartArr = JSON.parse(cartStr);
            var status = true;
            if (status == true) {
              // delete that row
              cartArr.splice(index,1);
            }
            localStorage.setItem("cart", JSON.stringify(cartArr));
            if (cartArr.length < 1) {
              localStorage.clear();
            }
            getData();
          });

    function numberFormat(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
    }
    
    // ending
})