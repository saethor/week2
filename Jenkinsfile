node {
    checkout scm
    stage('Commit') {
        sh 'yarn install'
        dir('client') {
            sh 'yarn install'
        }
        sh 'npm run test'
        withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
            sh './dockerbuild.sh'
        }
    }
    stage('Deploy') {
        dir('provisioning'){
            sh './provision-new-environment.sh'
        }
    }
}
