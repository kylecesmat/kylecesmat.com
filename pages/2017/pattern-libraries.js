import { Post } from "../../components/post/post";
import { Heading, P, Ul, Li } from "../../components/typography";
import { Image } from "../../components/post/media";

export default () =>
  <Post title="Pattern Libraries" date="March 22, 2017">
    <P>
      By now it's likely you've heard of, have interacted with, or maybe have
      even built a Pattern Library for use in a digital interface. Most product
      teams have agreed that having a "shared library" of UI elements helps them
      ship products to customers quicker, and more consistently.
    </P>
    <P>
      The importance of consistency cannot be overstated, many of the worlds
      most impactful brands value consistent messaging & design, creating trust
      & cohesive expirences for their customers. In the digital realm, companies
      have the challenge of staying consistent while building interfaces across
      platforms, modalities, and contexts. Pattern libraries help us stay
      coordinated, and offer a "single source of truth" for design & development
      teams. But you know this already!
    </P>
    <P>
      So, what if you've been tasked with overseeing the maintnence of this
      "platform-agnostic, reusable, simple UI library" for your team? Given a
      set of tasks, your job is to defend the Pattern Library from bad API
      choices, one-off component modifications, and overall code bloat.
      Remember, you want to set rules, encourage consistency, and protect your
      library from one-off UI changes or component over-extension.
    </P>
    <P>
      Keep in mind, [I prefer using React to build my interfaces]() so we'll
      talk about iterating on these components using `props`, but we can apply
      this thinking to any UI library.
    </P>

    <Heading weight="2">Today's excercise: Improve the pattern library</Heading>
    <P>
      Let's start with the humble Button, I often find myself iterating on this
      component the most throughout the lifecycle of pattern libraries.
    </P>
    <P>
      Imagine this is our current landscape of "Buttons":
      <Image
        src="/static/writing/pl-buttons.jpg"
        alt="Current Button Library"
      />
    </P>
    <P>
      <Heading weight="4">
        An AppleTV developer wants the button to glow when focused
      </Heading>
      From a developer perspective, gathering the requirements & implementing
      this might be simple. We'll add a `:focus` rule with the desired look and
      animation. But how do we make this work with our button ecosystem? These
      are good questions to ask:
    </P>
    <Ul>
      <Li>
        - The context of "focusing" on AppleTV is to show the user what they are
        about to select. Similar context on the web is `:hover` or `:focus`, and
        on a native platform, it might be `onPress`. Consult with the designers
        and ask if this behavior should be added for these platforms as well.
      </Li>
      <Li>
        - If this is only for the AppleTV, should you add a new prop? Something
        like `isAppleTvButton` might make sense. But now you have a fork in the
        code, and a prop that has no meaning to other consumers of your code.
      </Li>
      <Li>
        - Is this project-specific? Maybe this glow style is only used on one
        AppleTV app, but not another. If that's the case, ask the developer to
        create a local module and extend it in their project.
      </Li>
      <Li>
        - If this glow effect is cross-project, but not cross-platform, maybe
        consider creating a new `AppleTVButton` component in your library, where
        it wraps your base `Button` and exposes an `AppleTVButton` with specific
        handlers. This would be a good route for libraries that have multiple
        targets but same base styles.
      </Li>
    </Ul>
    <Heading weight="4">
      A web developer needs a purple button for a marketing campaign
    </Heading>
    <P>
      We've all been tasked with the one-off use that goes against brand norms.
      "Purple?!" You ask... "That'll never be used anywhere else!". So what do
      you do as the defender of the pattern library?
    </P>
    <Ul>
      <Li>
        - Don't be assumptive. Talk to the designers, ask if this might be a new
        accent down the road, maybe used in other marketing efforts on other
        apps.
      </Li>
      <Li>
        - If this is a one-off case, tell the developer to use `!important` and
        override the styles.. Just kidding, that's not the best solution either.
      </Li>
      <Li>
        - Consider exposing a thematic override prop, like `baseColor` that
        allows developers to create one-off button themes. A prop like this
        would only work well in an environment where your JS is compiled to CSS,
        and not one where you have predefined classes like `.button--teal` in a
        sass file.
      </Li>
      <Li>
        - Consider creating a utility to provide a theme. A wrapping utility
        such as `withTheme(Button)(purpleTheme)` where `withTheme` creates a new
        styling object might work here. Again, really only practical if you
        style components using JS.
      </Li>
    </Ul>
    <Heading weight="4">
      A native developer needs to reduce the border-radius
    </Heading>
    <P>
      A designer created a login page with a square-ish button with rounded
      corners. This goes against everything you know about buttons!
    </P>
    <Ul>
      <Li>
        - Consult a designer, is this new button a brand change? Do iOS
        platforms use it to emulate similar platform-specific UI? Ask questions
        to gain context, this will help you implement a powerful component API.
      </Li>
      <Li>
        - If this is iOS-specific, perhaps you could expose an `iOSButton`
        again, with ios-specific details.
      </Li>
      <Li>
        - Perhaps all buttons across platforms should be updated to this new
        "squareish" style. This is where the power of shared components come in
        to play... With just a few changes to code, this squareish button will
        not be deployed to all interfaces in the ecosystem. You've saved your
        company thousands of dollars in developer time with a few keystrokes!
      </Li>
      <Li>
        - Maybe some designs will use this, while most still rely on the rounded
        buttons for a slight-different meaning. In this case, adding a `square`
        prop might make sense. Avoid though the case of conflicting boolean
        props, and perhaps refactor the component API to use `edges=['square',
        'round']` or something of the sort.
      </Li>
    </Ul>

    <Heading weight="4">A designer wants to add a gradient button</Heading>
    <P>
      Gradients are so hot right now. Why not have a reusable Button that can be
      a gradient if needed? Let's break this down:
    </P>
    <Ul>
      <Li>
        - Gather requiremenets, do we have a specific set of gradients? maybe
        start/stop colors should be props? What happens on hovering? What if we
        mix a gradient & outline prop? So many questions.
      </Li>
      <Li>
        - Consider creating a `GradientButton` component if it'd never intended
        to be used alongside `outline` and if it contains a large amount of
        configurable props.
      </Li>
    </Ul>
    <Heading weight="2">In conclusion</Heading>
    <P>
      As the defender of the pattern library, you may get tasked with a lot of
      requests varying in scope & context. It is your job to ask questions,
      analyze long-term goals, and be empethetic to the needs of your fellow
      teammates.
    </P>
    <P>
      You can find usage patterns by focusing on the context and meaning of the
      elements, validating use-cases across developer & designer teams, and
      being aware of your comapnys ecosystem & goals. Often times, the safest
      solution is to be biased towards simple UI primitives, and building tools
      to combine style with context & function.
    </P>
  </Post>;
