#!/usr/bin/env groovy


podTemplate(label: 'node-js', 
    containers: [
        containerTemplate(name: 'node', image: 'node:10.7.0-alpine', command: 'cat', ttyEnabled: true),
        containerTemplate(name: 'docker', image: 'docker-registry.cashfree.com/cashfree-docker:latest', command: 'cat', ttyEnabled: true),
        containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:v1.11.9', command: 'cat', ttyEnabled: true)
    ],
    imagePullSecrets: ['regsecret'],
    volumes: [
        hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock')
    ]
  ) {
    node('node-js') {

        def deploymentId = UUID.randomUUID().toString()
        def buildNumber = env.BUILD_NUMBER
        def myRepo = checkout scm
        def gitBranch = myRepo.GIT_BRANCH
        def commit = myRepo.GIT_COMMIT
        def isMasterBranch = false;
        def isReleaseBranch = false;
        def packageVersion = "0.0.0";
        def isPr = false;
        def isFeatureBranch = false;
        def appName = 'cashfree-docs'
        if (gitBranch =~ 'master') {
          isReleaseBranch = true;
        } else if (gitBranch =~'release.*') {
          isFeatureBranch = true;
        } else if(env.CHANGE_ID) {
          isPr = true;
        } else {
          try {
            timeout(time: 15, unit: 'SECONDS') {
              input message: "Do you need to build this branch ${gitBranch} ?", parameters: [
                        [$class: 'BooleanParameterDefinition', defaultValue: false, description: "Do you need to build this branch ${gitBranch} ?", name: 'Ready']]
            }
          } catch (err) {
            return;
          }
          isFeatureBranch = true;
        }
        
        // Need to build for all
          stage('build') {
            container('node') {
              packageVersion = sh(
                  script: 'npm run version --silent',
                  returnStdout: true
              ).trim()
              appName = sh(
                  script: 'npm run app --silent',
                  returnStdout: true
              ).trim()
              sh """
              echo 'Building ${appName}:${packageVersion}'
              npm install -g gatsby-cli
              npm install
              gatsby build --prefix-paths
              """
              // Need to send report to sonarqube here
            }
          }

        if (isFeatureBranch) {
          return;
        }

        if (isPr) {
          try {
            timeout(time: 15, unit: 'SECONDS') {
            input message: "Ready to deploy PR ${gitBranch} ?", parameters: [
                        [$class: 'BooleanParameterDefinition', defaultValue: false, description: "Ready to deploy PR ${gitBranch} ?", name: 'Ready']]
            }
          } catch (err) {
            return;
          }

        }
        
        stage('docker build and push') {
          container('docker') {
            withCredentials([[$class: 'UsernamePasswordMultiBinding',
                credentialsId: 'nexus',
                usernameVariable: 'NEXUS_USER',
                passwordVariable: 'NEXUS_PASSWORD']]) {
                  if (isReleaseBranch) {
                    packageVersion = packageVersion+"."+buildNumber;
                  } else {
                    packageVersion = packageVersion+"-SNAPSHOT";
                  }
                  def dockerImage = "${appName}:${packageVersion}";
                  sh """
                  docker login docker-registry.cashfree.com -u ${NEXUS_USER} -p ${NEXUS_PASSWORD}
                  docker build -t ${appName} .
                  docker tag ${appName} docker-registry.cashfree.com/${dockerImage}
                  docker push docker-registry.cashfree.com/${dockerImage}
                  """
                }
            }
          }

    }
}
