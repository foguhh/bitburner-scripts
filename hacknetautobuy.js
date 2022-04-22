/** @param {NS} ns **/
export async function main(ns) {
function myMoney() {
    return ns.getServerMoneyAvailable("home");
}

ns.disableLog("getServerMoneyAvailable");
ns.disableLog("sleep");


function purchase(node, item, qty){
    var node = node, item = item, qty = qty;
    
    if (item == "New Node"){
        ns.hacknet.purchaseNode();
        ns.print("Purchasing New Node")
    }
    if (item == "LVL"){
        ns.hacknet.upgradeLevel(node , qty)
        ns.print("Purchasing LVL Upgrade for Node: " + node)
    }
    if (item == "RAM"){
        ns.hacknet.upgradeRam(node , qty)
        ns.print("Purchasing RAM Upgrade for Node: " + node)
    }
    if (item == "CPU"){
        ns.hacknet.upgradeCore(node , qty)
        ns.print("Purchasing CPU Upgrade for Node: " + node)
    }
}

function check_cheapest() {
    var new_node_cost = ns.hacknet.getPurchaseNodeCost();
    var node = "Default";
    var item = "New Node";
    var qty = 1;
    var cheapest = new_node_cost;
    var node_qty = ns.hacknet.numNodes();

    for (var i = 0; i < node_qty; i++) {
        var node_lvl = ns.hacknet.getLevelUpgradeCost(i, 1);
        var node_ram = ns.hacknet.getRamUpgradeCost(i, 1);
        var node_cpu = ns.hacknet.getCoreUpgradeCost(i, 1);

        if (node_lvl < cheapest) {
               cheapest = node_lvl;
               node = i;
               item = "LVL";
        }
        if (node_ram < cheapest) {
              cheapest = node_ram;
               node = i;
               item = "RAM";
        }
        if (node_cpu < cheapest) {
               cheapest = node_cpu;
               node = i;
               item = "CPU";
        }
}

    ns.print("")
    ns.print("Cheapest Hacknet Upgrade Available;")
    ns.print("Node             : " + node);
    ns.print("Item             : " + item);
    ns.print("Qty              : " + qty);
    ns.print("")
    ns.print("Current Balance  : $" + myMoney());
    ns.print("Upgrade Cost     : $" + cheapest);
    ns.print("")

    while (myMoney() < cheapest) {
        ns.print("Waiting for funds to increase")
        
    }
    
    purchase(node, item, qty);
}

while(true) {
	check_cheapest();
    await ns.sleep(3000);
}
}