/** @param {NS} ns **/
export async function main(ns) {
var myServers = ns.getPurchasedServers()

for (var i = 0 ; i < myServers.length; i++) {
	await ns.scp("generic-script.js", myServers[i]);
	ns.exec("generic-script.js", myServers[i], 3);
}
}