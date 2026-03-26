import { ReviewCard } from './ReviewCard';

export const VerticalMarqueeColumn = ({ items, reverse = false, duration = "50s" }) => (
    <div className="h-[600px] overflow-hidden relative group">
        <div className={`flex flex-col ${reverse ? 'animate-marquee-vertical-reverse' : 'animate-marquee-vertical'}`} style={{ animationDuration: duration }}>
            {items.map((r, i) => <ReviewCard key={i} r={r} />)}
            {items.map((r, i) => <ReviewCard key={`dup-${i}`} r={r} />)}
        </div>
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#020203] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#020203] to-transparent z-10 pointer-events-none" />
    </div>
);

