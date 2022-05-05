/** @param {NS} ns **/
export async function main(ns) {
var myServers = ns.getPurchasedServers()
var servers3Port = ["n00dles","foodnstuff","sigma-cosmetics","joesguns","hong-fang-tea","harakiri-sushi","nectar-net","CSEC","neo-net","zer0","max-hardware","iron-gym","silver-helix","the-hub","omega-net","avmnite-02h","phantasy","summit-uni","catalyst","rothman-uni","I.I.I.I","netlink","global-pharm","lexo-corp","alpha-ent","aevum-police","zb-def","nova-med","univ-energy","unitalife"]
var portTools = ["brutessh.exe","ftpcrack.exe","relaysmtp.exe","httpworm.exe"]
var portNS = [ns.brutessh, ns.ftpcrack, ns.relaysmtp, ns.httpworm]
var activeScript = "generic-script.js"
var scriptUsage = 2.40

// Purchased Servers

for (var i = 0 ; i < myServers.length; i++) {
	await ns.scp(activeScript, myServers[i]);
	ns.exec(activeScript, myServers[i], 3);
}


// 3 Ports
for (var i = 0 ; i < servers3Port.length; i++) {
	await ns.scp(activeScript, servers3Port[i]);
	
	for (var j = 0 ; j < portTools.length ; j++) {
		if (ns.fileExists(portTools[j], "home")){
			portNS[j](servers3Port[i]);
		}
	}

	ns.nuke(servers3Port[i]);
	ns.killall(servers3Port[i]);
	var threads = Math.floor(ns.getServerMaxRam(servers3Port[i]) / scriptUsage);
	ns.exec(activeScript, servers3Port[i], threads);
}
}