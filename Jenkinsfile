node {
    def nodeHome = tool name: 'Node691', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    env.PATH = "${nodeHome}/bin:${env.PATH}"
    checkout scm
    stage('Commit') {
        sh 'npm install'
        dir('client') {
            sh 'npm install'
        }
        sh 'npm run test'
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
            sh './dockerbuild.sh'
        }
    }
}
