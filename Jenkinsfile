node {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
    checkout scm
    stage('Commit') {
            sh 'npm install'
            sh 'npm run test'
    }
}
