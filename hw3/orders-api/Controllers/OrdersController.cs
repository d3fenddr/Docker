using Microsoft.AspNetCore.Mvc;
using OrdersApi.Models;

namespace OrdersApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private static readonly List<OrderDto> Orders =
    [
        new OrderDto { Id = 1, Customer = "Alice", Product = "Coffee", Quantity = 2 },
        new OrderDto { Id = 2, Customer = "Bob", Product = "Tea", Quantity = 1 },
        new OrderDto { Id = 3, Customer = "Charlie", Product = "Sandwich", Quantity = 3 }
    ];

    [HttpGet]
    public IEnumerable<OrderDto> Get()
    {
        return Orders;
    }
}


