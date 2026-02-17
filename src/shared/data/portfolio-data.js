export const ONLINE_RESUME_URL = '/resume.html'

export const contactSupportAreas = [
  {
    title: 'UX research and journey mapping',
    description:
      'Supporting research synthesis and mapping user journeys. Turning insights into clear, structured flows.',
  },
  {
    title: 'Wireframes and interface design',
    description: 'Creating clear layouts that balance usability and visual consistency.',
  },
  {
    title: 'Design system support',
    description: 'Documenting components, checking consistency, and improving scalability.',
  },
  {
    title: 'Frontend UX QA',
    description: 'Reviewing builds, identifying edge cases, and tightening interaction details.',
  },
]

export const projects = [
  {
    id: 'signal-room',
    title: 'Angkas App Redesign',
    category: 'Mobile UX Concept',
    chips: ['Concept', 'Solo', 'UX Design', 'Mobile'],
    year: '2022',
    summary: 'Independent redesign focused on faster booking and fewer interaction steps.',
    variant: 'insights',
    previewImageSrc: '/Angkas.png',
    href: '/projects/signal-room',
  },
  {
    id: 'motion-lab',
    title: 'KuryentePH Concept App',
    category: 'Energy Management Concept',
    chips: ['Mobile', 'Concept App', 'Energy Monitoring'],
    year: '2024',
    summary: 'Mobile concept for monitoring electricity usage, controlling devices, and rewarding savings.',
    variant: 'motion',
    previewImageSrc: '/projects/kuryenteph/case-study-cover.png',
    href: '/projects/motion-lab',
  },
  {
    id: 'alliance-link',
    title: 'FAST Concept App',
    category: 'Transportation UX Concept',
    chips: ['Mobile', 'Concept App', 'Transportation'],
    year: '2025',
    summary: 'Mobile ticketing concept to reduce queues and improve commuter updates.',
    variant: 'partnership',
    previewImageSrc: '/Fast.png',
    href: '/projects/alliance-link',
  },
]

export const projectCaseStudiesById = {
  'signal-room': {
    subtitle: 'Reducing interaction cost in a time sensitive booking flow',
    summary:
      'This independent concept redesign explores how the Angkas booking flow can be made faster and more efficient by reducing interaction cost in critical moments. The focus was not on adding features or visual refresh, but on removing friction that slows users down when requesting a ride under time pressure.',
    meta: [
      { label: 'Role', value: 'UX Designer' },
      { label: 'Timeline', value: 'August to September 2022' },
      { label: 'Scope', value: 'Booking flow usability optimization' },
      {
        label: 'Constraints',
        value:
          'Independent project with no access to internal data, engineering changes, or real user metrics. Existing brand and visual system treated as fixed.',
      },
      {
        label: 'Goal',
        value: 'Reduce the number of steps and perceived waiting time required to confirm a ride.',
      },
    ],
    headerMedia: {
      type: 'image',
      src: '/projects/angkas/Redesign_-_Angkas_App.png',
      alt: 'Angkas redesigned booking flow screens.',
    },
    problemSpace: {
      title: 'Speed and clarity mattered more than exploration',
      intro:
        'Angkas is used in situations where speed and clarity matter more than exploration or delight. During regular use, several friction points repeatedly surfaced in the booking flow.',
      points: [
        'Animations and transitions delayed access to core booking actions',
        'Route entry and voucher application were split into multiple steps',
        'Extra taps increased completion time for urgent ride requests',
      ],
      callout:
        'These issues compounded in high urgency scenarios, increasing cognitive load and making the booking experience feel slower than necessary.',
    },
    researchInsights: {
      title: 'Lightweight evaluation, high impact findings',
      intro:
        'Given the constraints, I focused on lightweight but targeted evaluation methods that could surface high impact issues quickly.',
      approach: [
        'Heuristic review of the existing app',
        'End to end flow mapping from app open to ride confirmation',
        'Step and tap count analysis',
        'Low fidelity prototype walkthroughs and self testing',
      ],
      findings: [
        'A significant portion of time was spent navigating screens rather than making decisions',
        'Several transitions added delay without improving clarity or feedback',
        'Related actions were separated despite being conceptually linked',
      ],
      coreInsight:
        'Reducing interaction cost and unnecessary motion improves perceived speed more than adding new features in time sensitive flows.',
    },
    designExploration: {
      title: 'Make it feel faster without breaking recognition',
      guidingQuestion:
        'How might the booking flow feel faster without changing what users already recognize?',
      sketching: {
        body:
          'Early sketches explored ways to merge route entry and voucher application into fewer steps, reduce confirmation screens, and surface primary booking actions more clearly.',
        points: [
          'Merge route entry and voucher application into fewer steps',
          'Reduce confirmation screens',
          'Surface primary booking actions more clearly',
        ],
        media: {
          type: 'image',
          src: '/projects/angkas/Sketch.png',
          alt: 'Early Angkas redesign sketches.',
        },
      },
      wireframes: {
        body:
          'Low fidelity wireframes translated sketches into structured flows with clear action hierarchy, fewer screens per task, and minimal navigation depth.',
        media: {
          type: 'image',
          src: '/projects/angkas/Wireframes.png',
          alt: 'Low fidelity Angkas wireframes.',
        },
      },
      prototyping: {
        body:
          'Interactive prototypes were used to test task completion speed, evaluate the impact of reduced motion, and check edge cases such as invalid routes or voucher errors. Motion was preserved only where it reinforced system feedback.',
        media: {
          type: 'image',
          src: '/projects/angkas/Final_Design.png',
          alt: 'Interactive Angkas prototype preview.',
        },
      },
    },
    solutionSummary: {
      title: 'Remove friction, keep familiarity',
      points: [
        {
          title: 'Reduced interactions',
          description:
            'Mapped and removed redundant screens to shorten the path from app open to ride confirmation.',
        },
        {
          title: 'Combined related actions',
          description:
            'Merged route entry and voucher application to reduce mid flow context switching.',
        },
        {
          title: 'Minimized non essential motion',
          description:
            'Removed transitions that added delay without improving understanding, keeping motion only where it supported feedback.',
        },
        {
          title: 'Preserved brand familiarity',
          description:
            'Maintained existing color, typography, and layout patterns to avoid disrupting user trust.',
        },
      ],
    },
    finalDesign: {
      title: 'Key screens',
      screens: [
        {
          label: 'Final screen 1',
          media: {
            type: 'image',
            src: '/projects/angkas/Introducing_a_clean_and_new_look_(right).png',
            alt: 'Angkas redesigned dashboard and booking entry screen.',
          },
        },
        {
          label: 'Final screen 2',
          media: {
            type: 'image',
            src: '/projects/angkas/Multiple_and_Schedule_Booking.png',
            alt: 'Angkas multiple and schedule booking screen.',
          },
        },
        {
          label: 'Final screen 3',
          media: {
            type: 'image',
            src: '/projects/angkas/Route_Tracking__Search.png',
            alt: 'Angkas route tracking and search screen.',
          },
        },
      ],
    },
    outcomes: {
      title: 'Evaluated through flow comparison and walkthroughs',
      intro:
        'While this was a concept project, outcomes were evaluated through flow comparison and prototype walkthroughs.',
      points: [
        {
          label: 'Reduced interactions',
          description: 'Fewer taps and screens required to complete a booking.',
        },
        {
          label: 'Faster perceived speed',
          description: 'Reduced waiting caused by unnecessary transitions.',
        },
        {
          label: 'Clearer flow',
          description: 'Users could more easily anticipate next steps during booking.',
        },
      ],
      callout:
        'These improvements demonstrate how small interaction changes can meaningfully improve efficiency in high pressure contexts.',
    },
    reflection: {
      title: 'Friction removal beat feature additions',
      intro:
        'This project reinforced that in time sensitive products, removing friction often delivers more value than adding features.',
      nextSteps: [
        'Validate changes with real user timing metrics',
        'Test performance on slower devices and networks',
        'Explore adaptive motion based on user context',
      ],
      note:
        'Balancing efficiency with familiarity proved critical. The goal was not to redesign Angkas, but to help users get moving faster.',
    },
    prototypeHref:
      'https://www.figma.com/proto/fsxMk1XgYf1UPaWUBiMHyh/ANGKAS---Redesign?page-id=50%3A485&node-id=1199-14175&node-type=frame&viewport=4147%2C3009%2C0.52&t=ftzzPFslgHVZr5vA-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1199%3A14175&show-proto-sidebar=1',
    prototypeLabel: 'View Interactive Prototype',
  },
  'motion-lab': {
    subtitle: 'Designing a clearer mobile experience for household electricity management',
    summary:
      'KuryentePH is an Android app concept developed from August to October 2024 to help users monitor electricity usage, control devices remotely, and make better energy decisions. The work covered research, wireframing, prototyping, and interface design, with the goal of turning complex utility behavior into a routine people can complete with confidence.',
    meta: [
      { label: 'Role', value: 'UI and UX Designer' },
      { label: 'Timeline', value: 'August to October 2024' },
      { label: 'Scope', value: 'Android energy management app concept' },
      {
        label: 'Tools',
        value:
          'Figma Design, FigJam, and ChatGPT',
      },
      {
        label: 'Goal',
        value:
          'Help users monitor usage, control devices, and save electricity through a clear mobile-first flow.',
      },
    ],
    headerMedia: {
      type: 'image',
      src: '/projects/kuryenteph/case-study-cover.png',
      alt: 'KuryentePH case study cover.',
    },
    problemSpace: {
      title: 'Users needed control, not just monthly bill numbers',
      intro:
        'KuryentePH started from a practical utility challenge: customers needed digital tools to monitor energy consumption, act earlier, and avoid avoidable electricity waste.',
      points: [
        'Real-time consumption was not visible in an easy-to-scan mobile flow',
        'Users lacked clear in-app guidance to turn data into concrete savings actions',
        'Rewards motivation existed as a product goal but was not integrated into daily monitoring routines',
      ],
      callout:
        'The opportunity was to combine visibility, control, and rewards in one predictable experience.',
    },
    researchInsights: {
      title: 'Research focused on everyday energy habits',
      intro:
        'Discovery combined lightweight interviews and surveys to understand energy behavior, frustrations, and feature priorities before committing to high-fidelity execution.',
      approach: [
        'Interviewed potential users about monitoring behavior and electricity pain points',
        'Collected survey input on alert expectations and preferred app actions',
        'Mapped core tasks around setup, monitoring, and remote control',
        'Validated flow clarity through iterative wireframe and prototype walkthroughs',
      ],
      findings: [
        'Users wanted immediate visibility into usage without deep menu navigation',
        'Remote control was more valuable when paired with live usage context',
        'Rewards concepts improved motivation, but only when presented simply',
      ],
      coreInsight:
        'Energy management feels manageable when monitoring, control, and motivation are connected in one routine.',
    },
    designExploration: {
      title: 'From exploratory sketches to testable flows',
      guidingQuestion:
        'How might KuryentePH make energy tracking and control simple enough for everyday use?',
      sketching: {
        body:
          'Sketches were used to explore page flow, action hierarchy, and transition clarity before committing to polished layouts.',
        points: [
          'Tested multiple dashboard entry points for quick monitoring',
          'Explored placement of device control actions beside usage summaries',
          'Iterated rewards touchpoints to support engagement without extra noise',
        ],
        media: {
          type: 'image',
          src: '/projects/kuryenteph/sketch-3.png',
          alt: 'KuryentePH early sketch exploration.',
        },
      },
      wireframes: {
        body:
          'Wireframes translated the concept into a clearer structure, helping validate navigation, screen hierarchy, and major interaction checkpoints.',
        media: {
          type: 'image',
          src: '/projects/kuryenteph/wireframe.jpg',
          alt: 'KuryentePH wireframe image.',
        },
      },
      prototyping: {
        body:
          'Prototyping combined user journey mapping and interaction walkthroughs to confirm that key tasks could be completed with minimal hesitation.',
        media: {
          type: 'image',
          src: '/projects/kuryenteph/prototyping.jpg',
          alt: 'KuryentePH prototyping image.',
        },
      },
    },
    solutionSummary: {
      title: 'A practical electricity-management experience',
      points: [
        {
          title: 'Real-time usage visibility',
          description:
            'Users can quickly check electricity consumption trends through an accessible mobile dashboard.',
        },
        {
          title: 'Remote device control',
          description:
            'Core control actions are integrated so users can respond to usage insights immediately.',
        },
        {
          title: 'Structured navigation and setup',
          description:
            'Clear information architecture and setup flow reduce confusion for first-time and repeat usage.',
        },
        {
          title: 'Rewards-ready behavior loop',
          description:
            'The experience supports energy-saving motivation by connecting monitoring actions to incentives.',
        },
      ],
    },
    finalDesign: {
      title: 'High-fidelity screens',
      screens: [
        {
          label: 'Final design 1',
          media: {
            type: 'image',
            src: '/projects/kuryenteph/final-overview.png',
            alt: 'KuryentePH final design overview.',
          },
        },
        {
          label: 'Final design 2',
          media: {
            type: 'image',
            src: '/projects/kuryenteph/final-usage-insights.png',
            alt: 'KuryentePH real-time usage insights screen.',
          },
        },
        {
          label: 'Final design 3',
          media: {
            type: 'image',
            src: '/projects/kuryenteph/final-remote-control.png',
            alt: 'KuryentePH remote device control screen.',
          },
        },
        {
          label: 'Final design 4',
          media: {
            type: 'image',
            src: '/projects/kuryenteph/final-device-setup.png',
            alt: 'KuryentePH effortless device setup screen.',
          },
        },
      ],
    },
    outcomes: {
      title: 'Validated through iterative walkthroughs',
      intro:
        'This concept was evaluated through small-group user testing, scenario walkthroughs, and repeated iteration from low-fidelity to high-fidelity prototypes.',
      points: [
        {
          label: 'Clearer task flow',
          description: 'Users could move from setup to monitoring with fewer clarification moments.',
        },
        {
          label: 'Improved confidence',
          description:
            'Participants reported stronger confidence in understanding app actions and next steps.',
        },
        {
          label: 'Higher engagement potential',
          description:
            'Combining monitoring and incentive framing increased interest in ongoing app usage.',
        },
      ],
      callout:
        'Iterative design and testing helped shape a smoother, more user-friendly utility app concept.',
    },
    reflection: {
      title: 'Daily reliability matters more than feature volume',
      intro:
        'KuryentePH reinforced that utility products succeed when routine actions are short, readable, and dependable.',
      nextSteps: [
        'Validate the flows with broader household user segments and diverse usage patterns',
        'Measure long-term engagement impact of rewards-linked monitoring behavior',
        'Add stronger accessibility and offline-friendly fallback states',
      ],
      note:
        'The project showed that combining clear IA, real-time visibility, and controllable actions can make energy management feel less overwhelming.',
    },
    prototypeHref:
      'https://www.figma.com/proto/lsaNcAqnPNB90B6ZUDWDMo/KuryentePH---Electricity-Management-App?page-id=1%3A20&node-id=40000098-17423&node-type=canvas&viewport=166%2C463%2C0.12&t=BHLU4sGrIqUmeoKq-1&scaling=contain&content-scaling=fixed&starting-point-node-id=40000098%3A17423&show-proto-sidebar=1',
    prototypeLabel: 'View Interactive Prototype',
  },
  'alliance-link': {
    subtitle: 'Mobile ticketing and train updates for LRT 2 commuters',
    summary:
      'FAST is a mobile app concept for LRT Line 2 that lets commuters purchase tickets anywhere, enter via QR, and receive timely updates for maintenance or emergencies. The concept focused on reducing queue dependency, lowering uncertainty during disruptions, and making repeat commutes faster to complete.',
    meta: [
      { label: 'Role', value: 'UI and UX Designer' },
      { label: 'Timeline', value: 'August 2022 to October 2022' },
      { label: 'Scope', value: 'Mobile ticketing, service updates, and trip adjustments' },
      { label: 'Tools', value: 'Figma and FigJam' },
      { label: 'Goal', value: 'Reduce queue time and improve commuter confidence during disruptions' },
    ],
    headerMedia: {
      type: 'image',
      src: '/projects/fast/case-study-cover.png',
      alt: 'FAST case study cover showing mobile ticketing and train updates.',
    },
    problemSpace: {
      title: 'Commuters lose time and control during peak hours',
      intro:
        'Metro Manila commuters rely on LRT 2 daily, but the trip experience is often disrupted by queueing, delayed communication, and limited flexibility once travel plans change.',
      points: [
        'Long queues for physical ticket purchase, especially during rush hour',
        'Delays and emergencies are often communicated too late',
        'Last minute trip changes are hard to manage with traditional tickets',
        'Limited real time support when issues happen',
      ],
      callout:
        'The core opportunity was to combine faster ticketing with clearer disruption communication in one predictable flow.',
    },
    researchInsights: {
      title: 'Pain-point-led discovery set the product direction',
      intro:
        'The discovery phase focused on commuter pain points and day to day constraints, then translated them into interface priorities that support speed and confidence.',
      approach: [
        'Mapped commuter issues in ticket purchase, updates, and plan adjustments',
        'Sketched critical paths to reduce decision points in core tasks',
        'Built information architecture to keep navigation predictable',
        'Validated flow clarity with wireframe and prototype walkthroughs',
      ],
      findings: [
        'Commuters value fewer steps in routine purchase tasks over feature depth',
        'Timely disruption messaging is as important as ticket purchase itself',
        'Flexible adjustment states reduce stress when plans change mid trip',
      ],
      coreInsight:
        'Convenience in transit products comes from predictable, low-friction routines rather than visual novelty.',
    },
    designExploration: {
      title: 'From sketch to flow architecture to testable screens',
      guidingQuestion:
        'How might commuters buy, adjust, and validate tickets faster while staying informed in real time?',
      sketching: {
        body:
          'Early sketches were used to validate screen sequence, reduce unnecessary detours, and establish a clear action hierarchy before moving into high-fidelity screens.',
        points: [
          'Define a shorter ticket purchase sequence for repeat use',
          'Position service updates near key travel decisions',
          'Keep ticket retrieval and validation access visible after payment',
        ],
        media: {
          type: 'image',
          src: '/projects/fast/sketch.png',
          alt: 'FAST early sketch showing the ticketing flow.',
        },
      },
      wireframes: {
        body:
          'Wireframes and information architecture clarified navigation, checkpoint messaging, and fallback states so commuters could complete tasks with less hesitation.',
        media: {
          type: 'image',
          src: '/projects/fast/wireframe-dashboard.png',
          alt: 'FAST dashboard wireframe.',
        },
      },
      prototyping: {
        body:
          'Interactive prototypes were used to test transition clarity and confirm that purchase, updates, and support remained readable in high-pressure commuting contexts.',
        media: {
          type: 'image',
          src: '/projects/fast/prototype-booking-flow.png',
          alt: 'FAST booking flow prototype screen.',
        },
      },
    },
    solutionSummary: {
      title: 'A digital ticketing and updates hub',
      points: [
        {
          title: 'In-app ticket purchase with QR entry',
          description:
            'Commuters can buy tickets before arriving at the station and enter with a scannable QR code.',
        },
        {
          title: 'Real-time disruption alerts',
          description:
            'Maintenance, emergency, and delay updates are surfaced quickly to support earlier decisions.',
        },
        {
          title: 'Flexible travel adjustments',
          description:
            'Trips can be adjusted up to one hour before departure to support common schedule changes.',
        },
        {
          title: 'Multiple payment options with live chat support',
          description:
            'Payment flexibility and in-moment support reduce friction when unexpected issues occur.',
        },
      ],
    },
    finalDesign: {
      title: 'High fidelity screens',
      screens: [
        {
          label: 'Final design 1',
          media: {
            type: 'image',
            src: '/projects/fast/final-design-1.png',
            alt: 'FAST final design screen 1.',
          },
        },
        {
          label: 'Final design 2',
          media: {
            type: 'image',
            src: '/projects/fast/final-design-2.png',
            alt: 'FAST final design screen 2.',
          },
        },
      ],
    },
    outcomes: {
      title: 'What success looks like',
      intro:
        'As a concept project, outcomes were evaluated through scenario walkthroughs and flow comparison against traditional station-first ticketing behavior.',
      points: [
        {
          label: 'Reduced queue dependence',
          description: 'Ticket purchase is shifted off station counters into a mobile-first path.',
        },
        {
          label: 'Earlier disruption awareness',
          description: 'Timely alerts help commuters react before delays cascade into missed trips.',
        },
        {
          label: 'Less painful travel changes',
          description: 'Built-in flexibility supports schedule updates without restarting the journey.',
        },
        {
          label: 'In-moment support',
          description: 'Live chat pathways provide help when issues happen during travel.',
        },
      ],
      callout:
        'Combining ticketing, status updates, and support in one flow reduced interaction friction and commuter uncertainty.',
    },
    reflection: {
      title: 'Designing for routine, not novelty',
      intro:
        'FAST reinforced that daily transit experiences improve most when routine actions are shorter, clearer, and easier to recover from when disruptions happen.',
      nextSteps: [
        'Validate ticket and alert flows with live transport disruptions',
        'Measure repeat commuter task time versus kiosk-first baselines',
        'Expand accessibility and offline fallback for ticket retrieval',
      ],
      note:
        'FAST is a concept project focused on making LRT 2 commuting smoother, safer, and more predictable through digital ticketing and real-time updates.',
    },
    prototypeHref:
      'https://www.figma.com/proto/4Iq53MltARwPSCyCkvzPch/FAST-by-CK?page-id=2%3A16&node-id=40000018-2674&node-type=frame&viewport=846%2C1340%2C0.25&t=UmLG4BwcXVR6uAj0-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=40000018%3A2674&show-proto-sidebar=1',
    prototypeLabel: 'Open Prototype in Figma',
  },
}
