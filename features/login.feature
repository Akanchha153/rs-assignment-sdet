Feature: RudderStack Flow

  Scenario: Validate event delivery through RudderStack
    Given Login to Rudderstack
    When Extract the data plane URL and write key
    When Send an event via API
    Then See the event delivered in webhook destination
