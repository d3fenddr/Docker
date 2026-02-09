using CustomersApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace CustomersApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private static readonly List<CustomerDto> Customers =
    [
        new CustomerDto { Id = 1, Name = "Alice", Email = "alice@example.com" },
        new CustomerDto { Id = 2, Name = "Bob", Email = "bob@example.com" },
        new CustomerDto { Id = 3, Name = "Charlie", Email = "charlie@example.com" }
    ];

    [HttpGet]
    public IEnumerable<CustomerDto> Get()
    {
        return Customers;
    }
}


