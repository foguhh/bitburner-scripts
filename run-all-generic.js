/** @param {NS} ns **/
export async function main(ns) {
var myServers = ns.getPurchasedServers()
var servers0Port = ["n00dles","foodnstuff","sigma-cosmetics","joesguns","hong-fang-tea","harakiri-sushi","nectar-net"]
var servers1Port = ["CSEC","neo-net","zer0","max-hardware","iron-gym"]
var servers2Port = ["silver-helix","the-hub","omega-net","avmnite-02h","phantasy"]
var activeScript = "generic-script.js"
var scriptUsage = 2.40

// Purchased Servers

for (var i = 0 ; i < myServers.length; i++) {
	await ns.scp(activeScript, myServers[i]);
	ns.exec(activeScript, myServers[i], 3);
}

// 0 ports
for (var i = 0 ; i < servers0Port.length; i++) {
	await ns.scp(activeScript, servers0Port[i]);
	ns.nuke(servers0Port[i]);

	var threads = Math.floor(ns.getServerMaxRam(servers0Port[i]) / scriptUsage);
	ns.exec(activeScript, servers0Port[i], threads);
}

// 1 port
for (var i = 0 ; i < servers1Port.length; i++) {
	await ns.scp(activeScript, servers1Port[i]);
	
	if (ns.fileExists("BruteSSH.exe","home")){
		ns.brutessh(servers1Port[i]);
	}
	
	ns.nuke(servers1Port[i]);
	var threads = Math.floor(ns.getServerMaxRam(servers1Port[i]) / scriptUsage);
	ns.exec(activeScript, servers1Port[i], threads);
}

// 2 Ports
for (var i = 0 ; i < servers2Port.length; i++) {
	await ns.scp(activeScript, servers2Port[i]);
	
	if (ns.fileExists("BruteSSH.exe","home")){
		ns.brutessh(servers2Port[i]);
	}

	if (ns.fileExists("FTPCrack.exe","home")){
		ns.ftpcrack(servers2Port[i]);
	}
	
	ns.nuke(servers2Port[i]);
	var threads = Math.floor(ns.getServerMaxRam(servers2Port[i]) / scriptUsage);
	ns.exec(activeScript, servers2Port[i], threads);
}
}