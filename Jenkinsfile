node() {


  stage 'Print evs'
  sh '''
      echo ${env.BRANCH_NAME}
      echo ${env.GIT_COMMIT}
     '''

  // stage 'Build Docker Image'
  // sh 'docker build --no-cache -t smallfish/auth .'

  // stage 'Push Docker Image to ECR'
  // sh '''   
  //   docker tag smallfish/auth:latest 315671387076.dkr.ecr.eu-west-1.amazonaws.com/smallfish/auth:test
    
  //   docker push 315671387076.dkr.ecr.eu-west-1.amazonaws.com/smallfish/auth:test
  //   '''

    
}