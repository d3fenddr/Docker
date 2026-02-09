namespace OrdersApi.Models;

public class OrderDto
{
    public int Id { get; set; }
    public string Customer { get; set; } = string.Empty;
    public string Product { get; set; } = string.Empty;
    public int Quantity { get; set; }
}


