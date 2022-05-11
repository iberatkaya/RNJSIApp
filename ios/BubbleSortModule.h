#import <React/RCTBridgeModule.h>

@interface BubbleSortModule : NSObject <RCTBridgeModule>

@end

#ifndef BUBBLESORT_H
#define BUBBLESORT_H

namespace facebook {
namespace jsi {
class Runtime;
}
}


namespace bubbleSort {

void install(facebook::jsi::Runtime &jsiRuntime);

}


#endif 
