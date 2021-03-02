package main

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"runtime"
	"sort"
	"strings"
)

func main() {
	var command string = os.Args[1]
	switch command {
		case "update":
			update()
		case "version":
			version()
		case "greset":
			gitReset()
		case "gpush":
			gitPush()
		case "gremoteupdate":
			gitRemoteUpdate()
		case "hrklogs":
			herokuLogs()
		case "hrkopen":
			herokuOpen()
		case "hrkrestart":
			herokuRestart()
		case "killport":
			killPort()
		case "gobuild":
			goBuild()
		case "dockerlist":
			dockerList()
		case "help":
			help()
		default:
			help()
	}
}

func dockerList() {
	listAllArgs := []string{"ps", "-a"}
	execCommand("docker", listAllArgs)
}

func goBuild() {
	var name string = os.Args[2]
	nameArgs := []string{"build", "-o", name}
	execCommand("go", nameArgs)
}

func killPort() {
	var port string = os.Args[2]
	portArgs := []string{"lsof", "-i", "tcp:" + port}
	execCommand("sudo", portArgs)
}

func help() {
	commands := []string{"greset", "update", "version", "gpush", "gremoteupdate", "hrklogs", "hrkopen", "hrkrestart", "killport", "gobuild", "dockerlist"}
	sort.Strings(commands)
	for i, command := range commands {
		fmt.Println(i + 1, "-", command)
	}
}

func gitPush() {
	// Add All
	pullArgs := []string{"pull", "origin", "master"}
	execCommand("git", pullArgs)
	// Add All
	addArgs := []string{"add", "--all"}
	execCommand("git", addArgs)
	// Status
	statusArgs := []string{"status"}
	execCommand("git", statusArgs)
	// Commit
	var message string = os.Args[2]
	commitArgs := []string{"commit", "-m", message}
	execCommand("git", commitArgs)
	// Push
	pushArgs := []string{"push"}
	execCommand("git", pushArgs)
}

func gitReset() {
	// Reset
	resetArgs := []string{"reset", "--hard"}
	execCommand("git", resetArgs)
	// Clean
	cleanArgs := []string{"clean", "-f", "-d"}
	execCommand("git", cleanArgs)
}

func gitRemoteUpdate() {
	// Get Remote
	getRemoteArgs := []string{"remote", "-v"}
	execCommand("git", getRemoteArgs)
	// Update Remote
	var newRemoteURL string = "\"" + os.Args[2] + "\""
	updateRemoteArgs := []string{"remote", "set-url", "origin", newRemoteURL}
	execCommand("git", updateRemoteArgs)
	// Get Remote - Double Check
	execCommand("git", getRemoteArgs)
}

func herokuLogs(){
	var app string = os.Args[2]
	logsArgs := []string{"logs", "--tail", "--app", app}
	execCommand("heroku", logsArgs)
}

func herokuOpen() {
	var app string = os.Args[2]
	openArgs := []string{"apps:open", "--app", app}
	execCommand("heroku", openArgs)
}

func herokuRestart() {
	var app string = os.Args[2]
	restartArgs := []string{"ps:restart", "web.1", "--app", app}
	execCommand("heroku", restartArgs)
}

func version() {
	fmt.Println("Minh", "1.0.0")
}

func update() {
	updateOS()
	updateYarn()
}

func updateOS() {
	var os string = runtime.GOOS
	fmt.Println("OS:", os)
	fmt.Println()
	switch os {
		case "darwin":
			updateWithBrew()
		case "linux":
			updateRHEL()
			updateWithAPT()
		default:
			fmt.Println("OS:", os)
	}
}

func updateRHEL() {
	// Update
	var updateArgs = []string{"update"}
	execCommand("yum", updateArgs)
	// Clean Up
	var autoremoveArgs = []string{"autoremove"}
	execCommand("yum", autoremoveArgs)
}

func updateWithAPT() {
	// Upgrade
	var upgradeArgs = []string{"apt-get", "upgrade"}
	execCommand("sudo", upgradeArgs)
	// Update
	var updateArgs = []string{"apt-get", "update"}
	execCommand("sudo", updateArgs)
	// Clean Up
	var autoremoveArgs = []string{"apt", "autoremove"}
	execCommand("sudo", autoremoveArgs)
}

func updateWithBrew() {
	// Upgrade
	var upgradeArgs = []string{"upgrade"}
	execCommand("brew", upgradeArgs)
	// Update
	var updateArgs = []string{"update"}
	execCommand("brew", updateArgs)
	// Clean Up
	var cleanupArgs = []string{"cleanup"}
	execCommand("brew", cleanupArgs)
}

func updateYarn() {
	// Upgrade
	upgradeArgs := []string{"global", "upgrade", "--latest"}
	execCommand("yarn", upgradeArgs)
	// List
	listArgs := []string{"global", "list"}
	execCommand("yarn", listArgs)
}

func execCommand(app string, listOfArgs []string) {
	fmt.Println(app, strings.Join(listOfArgs, " "))
	output, err := exec.Command(app, listOfArgs...).CombinedOutput()
	if err != nil {
		log.Println(err)
	}
	fmt.Println(string(output))
}