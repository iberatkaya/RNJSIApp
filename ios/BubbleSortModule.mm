#import "BubbleSortModule.h"
#import <React/RCTBridge+Private.h>
#import <React/RCTLog.h>
#import <React/RCTUtils.h>
#import <jsi/jsi.h>

#include <thread>

using namespace facebook::jsi;
using namespace std;

@implementation BubbleSortModule

@synthesize bridge = _bridge;
@synthesize methodQueue = _methodQueue;

// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE(BubbleSortModule);

+ (BOOL)requiresMainQueueSetup {

  return YES;
}

// Installing JSI Bindings as done by
// https://github.com/mrousavy/react-native-mmkv
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(install) {
  RCTLogInfo(@"init install");
  RCTBridge *bridge = [RCTBridge currentBridge];
  RCTCxxBridge *cxxBridge = (RCTCxxBridge *)bridge;
  if (cxxBridge == nil) {
    return @false;
  }

  auto jsiRuntime = (Runtime *)cxxBridge.runtime;
  if (jsiRuntime == nil) {
    return @false;
  }

  bubbleSort::install(*(facebook::jsi::Runtime *)jsiRuntime);

  return @true;
}

RCT_EXPORT_METHOD(bubbleSort
                  : (NSArray *)items resolver
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject) {
  @try {
    NSMutableArray *sortedArray = [items mutableCopy];

    long count = sortedArray.count;

    bool swapped = YES;

    while (swapped) {
      swapped = NO;

      for (int i = 1; i < count; i++) {
        int x = [sortedArray[i - 1] intValue];
        int y = [sortedArray[i] intValue];

        if (x > y) {
          [sortedArray exchangeObjectAtIndex:(i - 1) withObjectAtIndex:i];
          swapped = YES;
        }
      }
    }
    // RCTLogInfo(@"Array: %@", sortedArray);
    resolve(sortedArray);
  } @catch (NSException *e) {
    reject(@"Error", @"Exception occured", nil);
  }
}

@end

namespace bubbleSort {

void install(Runtime &jsiRuntime) {
  auto bubbleSort = Function::createFromHostFunction(
      jsiRuntime, PropNameID::forAscii(jsiRuntime, "bubbleSort"), 0,
      [](Runtime &runtime, const Value &thisValue, const Value *arguments,
         size_t count) -> Value {
        auto items = arguments[0].asObject(runtime).asArray(runtime);

        auto len = items.length(runtime);

        bool swapped = YES;

        while (swapped) {
          swapped = NO;

          for (int i = 1; i < len; i++) {
            auto x = items.getValueAtIndex(runtime, i - 1).asNumber();
            auto y = items.getValueAtIndex(runtime, i).asNumber();

            if (x > y) {
              items.setValueAtIndex(runtime, i - 1, y);
              items.setValueAtIndex(runtime, i, x);

              swapped = YES;
            }
          }
        }

        return Value(runtime, items);
      });

  jsiRuntime.global().setProperty(jsiRuntime, "bubbleSort", move(bubbleSort));
}
}
