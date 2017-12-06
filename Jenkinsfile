node {
    def nodeHome = tool name: 'Node691', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    env.PATH = "${nodeHome}/bin:${env.PATH}"
    checkout scm
    stage('Commit') {
        sh 'npm install'
        dir 'client'
        sh 'npm install'
        dir '..'
        sh 'npm run test'
        sh './dockerbuild.sh'
    }
}
