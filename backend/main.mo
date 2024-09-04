import Bool "mo:base/Bool";
import Debug "mo:base/Debug";
import Order "mo:base/Order";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Float "mo:base/Float";
import Time "mo:base/Time";

actor {
  // Mock data
  stable var mockPriceData : [(Time.Time, Float)] = [
    (1630000000000000000, 3.65),
    (1630086400000000000, 3.70),
    (1630172800000000000, 3.60),
    (1630259200000000000, 3.55),
    (1630345600000000000, 3.50),
    (1630432000000000000, 3.45)
  ];

  stable var mockOrderBook : [(Float, Float, Float)] = [
    (3.62, 1000.00, 3620.00),
    (3.61, 1000.00, 3610.00),
    (3.60, 1000.00, 3600.00),
    (3.59, 1000.00, 3590.00),
    (3.58, 1000.00, 3580.00),
    (3.57, 1000.00, 3570.00),
    (3.56, 1000.00, 3560.00),
    (3.55, 1000.00, 3550.00)
  ];

  // API methods
  public query func getPriceData() : async [(Time.Time, Float)] {
    mockPriceData
  };

  public query func getOrderBook() : async [(Float, Float, Float)] {
    mockOrderBook
  };

  public func placeMockOrder(price : Float, quantity : Float, isBuy : Bool) : async () {
    // In a real implementation, this would update the order book
    // For this MVP, we'll just log the order
    let orderType = if (isBuy) "Buy" else "Sell";
    let total = price * quantity;
    let orderString = "Placed " # orderType # " order: " # 
                      Float.toText(quantity) # " ICP at " # 
                      Float.toText(price) # " USDT. Total: " # 
                      Float.toText(total) # " USDT";
    // In a real implementation, we would update the order book here
    // For now, we'll just print the order details
    // Note: Debug.print is used here for demonstration. In a production
    // environment, you'd want to use proper logging mechanisms.
    // Debug.print(orderString);
  };
}
