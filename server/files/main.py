#include <iostream>

using namespace std;

int main(){
   cout<<"creiamo il triangolo!"<<endl;
   
   int h = 20;
   for(int i=0; i<h; i++){
      for(int j=0;j<h-i-1;j++){
        cout<<" ";
      }
      for(int j=0;j<i-1;j++){
        cout<<"*";
      }
      cout<<endl;
   }

   return 0;
}