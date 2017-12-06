node {
    def nodeHome = tool name: 'Node691', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    env.PATH = "${nodeHome}/bin:${env.PATH}"
    checkout scm
    stage('Commit') {
        sh 'npm install'
        sh 'cd client'
        sh 'npm install'
        sh 'cd ..'
        sh 'npm run test'
        sh './dockerbuild.sh'
    }
}
