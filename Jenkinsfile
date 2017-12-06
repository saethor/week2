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
        withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
            sh './dockerbuild.sh'
        }
    }
}
