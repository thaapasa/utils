import React from "react"
import {
  NavigationEventSubscription,
  NavigationScreenProps
} from "react-navigation"

export interface FocusProps {
  focused: boolean
}

interface Focusable {
  didFocus?: () => void
}

export function FocusAware<T extends {}, P extends NavigationScreenProps<T>>(
  ComponentType: React.ComponentType<
    P & FocusProps & React.ClassAttributes<Focusable>
  >
) {
  return class extends React.Component<P, FocusProps> {
    state: FocusProps = {
      focused: false
    }
    private subscriptions: NavigationEventSubscription[] = []
    private instance: React.RefObject<Focusable>

    constructor(props: P & FocusProps) {
      super(props)
      this.instance = React.createRef<Focusable>()
    }

    componentDidMount() {
      this.subscriptions.push(
        this.props.navigation.addListener("didFocus", () => {
          this.setState({ focused: true }, () => {
            if (this.instance.current && this.instance.current.didFocus) {
              this.instance.current.didFocus()
            }
          })
        })
      )
      this.subscriptions.push(
        this.props.navigation.addListener("didBlur", () => {
          this.setState({ focused: false })
        })
      )
    }

    componentWillUnmount() {
      this.subscriptions.forEach(s => s.remove())
      this.subscriptions = []
    }

    render() {
      return (
        <ComponentType {...this.props} {...this.state} ref={this.instance}>
          {this.props.children}
        </ComponentType>
      )
    }
  }
}
