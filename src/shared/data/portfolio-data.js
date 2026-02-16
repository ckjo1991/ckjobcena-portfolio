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
    category: 'Category Placeholder',
    chips: ['Energy Monitoring', 'Concept', 'Mobile'],
    year: '2026',
    summary: 'Making electricity consumption easier to track and understand.',
    variant: 'motion',
    previewImageSrc: '/KuryentePH.png',
    href: '/projects/motion-lab',
  },
  {
    id: 'alliance-link',
    title: 'FAST Concept App',
    category: 'Category Placeholder',
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
    subtitle: 'Making electricity usage easier to monitor and act on',
    summary:
      'KuryentePH is a concept app that reframes household electricity data into clear trends, alerts, and actionable suggestions. The project focused on reducing interpretation effort so users can quickly understand their usage and make better decisions.',
    meta: [
      { label: 'Role', value: 'UX Designer' },
      { label: 'Timeline', value: '2026 concept sprint' },
      { label: 'Scope', value: 'Usage tracking and insight experience' },
      {
        label: 'Constraints',
        value:
          'Concept project with no utility backend integration. Data behavior was simulated in prototype scenarios.',
      },
      {
        label: 'Goal',
        value: 'Help users identify high consumption patterns and reduce wasted energy.',
      },
    ],
    headerMedia: {
      type: 'image',
      src: '/KuryentePH.png',
      alt: 'KuryentePH app project preview.',
    },
    problemSpace: {
      title: 'Users had data but lacked quick interpretation',
      intro:
        'Most electricity statements provide numbers but limited guidance. Users struggle to connect spikes in usage with specific household behaviors.',
      points: [
        'Consumption history is hard to compare at a glance',
        'Alerts are often generic and disconnected from context',
        'Recommendations are not prioritized by likely impact',
      ],
      callout:
        'The product direction prioritized clarity first, then depth for users who wanted to investigate more.',
    },
    researchInsights: {
      title: 'Focused research on decision moments',
      intro:
        'The discovery work centered on when users check bills, what they look for first, and what blocks action.',
      approach: [
        'Comparative review of energy tracking interfaces',
        'Scenario mapping around billing and peak usage moments',
        'Information hierarchy tests with low fidelity screens',
        'Iteration walkthroughs based on clarity scoring',
      ],
      findings: [
        'Users first seek a simple answer: up or down versus last cycle',
        'Chart interactions need plain language summaries to be useful',
        'Action prompts are stronger when tied to a specific pattern',
      ],
      coreInsight:
        'A clear default story with optional detail outperforms dense dashboards in utility contexts.',
    },
    designExploration: {
      title: 'Guide users from signal to action',
      guidingQuestion:
        'How might consumption insights become understandable in under a minute?',
      sketching: {
        body:
          'Sketches explored a summary first layout, simplified trend cards, and clear action prompts linked to notable usage events.',
        points: [
          'Prioritize bill cycle summary in the first viewport',
          'Group trends by impact and confidence',
          'Link recommendations directly to observed signals',
        ],
        media: {
          type: 'placeholder',
          label: 'Early sketches and flow explorations',
        },
      },
      wireframes: {
        body:
          'Wireframes refined data hierarchy, interaction density, and progression from quick scan to deeper analysis.',
        media: {
          type: 'placeholder',
          label: 'Low fidelity wireframes',
        },
      },
      prototyping: {
        body:
          'Prototype walkthroughs validated readability, touch targets, and whether users could identify next actions without guidance.',
        media: {
          type: 'placeholder',
          label: 'Interactive prototype walkthrough',
        },
      },
    },
    solutionSummary: {
      title: 'Simplify interpretation and next actions',
      points: [
        {
          title: 'Clear first scan',
          description: 'Frontloaded critical comparisons with concise labels and visual cues.',
        },
        {
          title: 'Action linked insights',
          description: 'Connected each anomaly with specific behavior suggestions.',
        },
        {
          title: 'Progressive detail',
          description: 'Kept advanced charts available without overwhelming the default flow.',
        },
      ],
    },
    finalDesign: {
      title: 'Key screens',
      screens: [
        {
          label: 'Final screen 1',
          media: { type: 'image', src: '/KuryentePH.png', alt: 'KuryentePH preview screen 1.' },
        },
        {
          label: 'Final screen 2',
          media: { type: 'image', src: '/KuryentePH.png', alt: 'KuryentePH preview screen 2.' },
        },
        {
          label: 'Final screen 3',
          media: { type: 'image', src: '/KuryentePH.png', alt: 'KuryentePH preview screen 3.' },
        },
      ],
    },
    outcomes: {
      title: 'Evaluated through scenario based walkthroughs',
      intro:
        'Outcomes were measured through guided scenarios and flow comparison against baseline dashboard patterns.',
      points: [
        { label: 'Faster scan time', description: 'Users identified usage direction with fewer interactions.' },
        { label: 'Higher confidence', description: 'Users reported stronger understanding of anomaly causes.' },
        { label: 'Stronger intent', description: 'Users could name a concrete next action more consistently.' },
      ],
      callout:
        'The concept showed that energy insights become more useful when interpretation friction is reduced early.',
    },
    reflection: {
      title: 'Clarity is the main product value',
      intro:
        'The project emphasized that utility apps earn trust by reducing ambiguity rather than increasing data density.',
      nextSteps: [
        'Validate recommendations with real meter datasets',
        'Test long term behavior change and retention',
        'Explore regional tariff-aware guidance',
      ],
      note:
        'The strongest design improvements came from simplifying language and decision paths, not adding more charts.',
    },
  },
  'alliance-link': {
    subtitle: 'Reducing queue friction in a commuter ticketing flow',
    summary:
      'FAST is a mobile ticketing concept aimed at making commuting updates and pass purchases faster. The work focused on reliability, clear status communication, and fewer steps in repeat travel scenarios.',
    meta: [
      { label: 'Role', value: 'UX Designer' },
      { label: 'Timeline', value: '2025 concept sprint' },
      { label: 'Scope', value: 'Mobile ticketing and commute updates' },
      {
        label: 'Constraints',
        value:
          'Concept exploration with no live transport API integration. Service status and ticket states were simulated.',
      },
      {
        label: 'Goal',
        value: 'Reduce queue dependence and improve rider confidence before and during travel.',
      },
    ],
    headerMedia: {
      type: 'image',
      src: '/Fast.png',
      alt: 'FAST ticketing concept app preview.',
    },
    problemSpace: {
      title: 'Commuters need certainty, not just ticket purchase',
      intro:
        'Ticketing tools often separate purchase, trip status, and station updates, forcing users to jump between screens in high traffic moments.',
      points: [
        'Ticket purchase can require too many confirmation steps',
        'Delay updates are hard to spot in the primary flow',
        'Repeat commute actions are not optimized for speed',
      ],
      callout:
        'The target experience prioritized dependable updates and one handed completion under time pressure.',
    },
    researchInsights: {
      title: 'Service confidence drove interface priorities',
      intro:
        'Research centered on when riders feel uncertain and what information improves decision confidence quickly.',
      approach: [
        'Journey map review for peak and off-peak commuting',
        'Task decomposition for ticket purchase and validation',
        'Hierarchy tests for delay and platform updates',
        'Prototype walkthroughs for repeat commute scenarios',
      ],
      findings: [
        'Riders value clear delay status before payment',
        'Defaulting to saved routes reduces repeated effort',
        'Persistent ticket state visibility lowers anxiety at gates',
      ],
      coreInsight:
        'Commuter tools perform best when purchase and service confidence are presented as one continuous flow.',
    },
    designExploration: {
      title: 'Support rapid commute decisions end to end',
      guidingQuestion:
        'How might mobile ticketing stay fast while improving trust in live commute status?',
      sketching: {
        body:
          'Sketches tested condensed purchase flows, quick rebook states, and integrated status cards near core actions.',
        points: [
          'Expose service status before purchase commitment',
          'Speed up repeat ticket purchase with saved commute patterns',
          'Keep active ticket state visible after payment',
        ],
        media: {
          type: 'placeholder',
          label: 'Early sketches and flow explorations',
        },
      },
      wireframes: {
        body:
          'Wireframes refined button hierarchy, fallback states, and checkpoint messaging for commuters in motion.',
        media: {
          type: 'placeholder',
          label: 'Low fidelity wireframes',
        },
      },
      prototyping: {
        body:
          'Interactive prototypes were used to compare queue replacement paths and communication quality during delay conditions.',
        media: {
          type: 'placeholder',
          label: 'Interactive prototype walkthrough',
        },
      },
    },
    solutionSummary: {
      title: 'Keep flow short and status obvious',
      points: [
        {
          title: 'Shortened ticket path',
          description: 'Reduced screens for common purchase tasks and repeated routes.',
        },
        {
          title: 'Integrated service context',
          description: 'Placed delay and platform updates inside the main ticket flow.',
        },
        {
          title: 'Persistent ticket visibility',
          description: 'Kept active ticket state easy to retrieve before station entry.',
        },
      ],
    },
    finalDesign: {
      title: 'Key screens',
      screens: [
        {
          label: 'Final screen 1',
          media: { type: 'image', src: '/Fast.png', alt: 'FAST preview screen 1.' },
        },
        {
          label: 'Final screen 2',
          media: { type: 'image', src: '/Fast.png', alt: 'FAST preview screen 2.' },
        },
        {
          label: 'Final screen 3',
          media: { type: 'image', src: '/Fast.png', alt: 'FAST preview screen 3.' },
        },
      ],
    },
    outcomes: {
      title: 'Evaluated through flow walkthrough comparison',
      intro:
        'The concept was evaluated by comparing baseline ticket tasks with redesigned routes across routine and delay scenarios.',
      points: [
        { label: 'Lower task friction', description: 'Commuters completed core purchase tasks in fewer steps.' },
        { label: 'Better status awareness', description: 'Users noticed critical updates earlier in the flow.' },
        { label: 'Improved continuity', description: 'Ticket retrieval felt more consistent after payment.' },
      ],
      callout:
        'Results indicated that combining status and purchase context can reduce both delay stress and interaction cost.',
    },
    reflection: {
      title: 'Transit UX depends on confidence loops',
      intro:
        'The most valuable improvements came from reducing uncertainty at each stage, not from adding visual complexity.',
      nextSteps: [
        'Test with live service interruptions and recovery states',
        'Measure repeat commute speed against kiosk baselines',
        'Explore offline fallback for ticket retrieval',
      ],
      note:
        'Reliable status communication and short repeat flows were the strongest levers for commuter trust.',
    },
  },
}
