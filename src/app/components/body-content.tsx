export default function BodyContent() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted-foreground text-pretty leading-[120%]">
        <span className="text-white italic">Cognitude Labs</span> is an applied
        AI company focused on education—a massive market where millions of
        people face daily uncertainty and existing tools are primitive. We
        develop autonomous agents that integrate across systems, maintain
        context, and adapt to individual learners to solve the fundamental
        problem of not knowing.
      </p>

      <p className="text-muted-foreground text-pretty leading-[120%]">
        Most AI tools are stateless assistants—they forget context, can't
        integrate across systems, and provide generic responses. We build agents
        that maintain persistent understanding, connect to the tools learners
        actually use, and adapt their guidance based on outcomes. This is the
        difference between a chatbot and an autonomous agent.
      </p>

      <p className="text-muted-foreground text-pretty leading-[120%]">
        Cognitude Labs was founded by
        a team of engineers and researchers from Western Norway University of
        Applied Science.
      </p>

      <p className="text-white mt-4 text-lg">
        Andreas Lind Benestad, Jarle Aragon Halden, Andreas Tunes Huse, David
        Lunde Sandvik, Thomas Otterå Årland
      </p>
    </div>
  );
}
