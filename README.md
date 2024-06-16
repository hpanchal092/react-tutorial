# My React Tutorial Repo

It also uses typescript, unlike the normal React tutorial, because I figured I
also need to learn typescript, and also I don't know if I can use a language
without types after using kotlin. I used vite as the build tool, because
supposedly vite is like one of the fastest build tools. I also personally used
bun instead of node, because bun is cool, but you are free to use whatever you
wish.

```sh
# what i ran
bun run dev

# what you can run to use an objectively slower runtime
npm run dev
```

## Bonus Goals at the Bottom of the Tutorial Page

1. [x] For the current move only, show “You are at move #…” instead of a
   button.
2. [x] Rewrite `Board` to use two loops to make the squares instead of
   hardcoding them.
3. [ ] Add a toggle button that lets you sort the moves in either ascending or
   descending order.
4. [ ] When someone wins, highlight the three squares that caused the win (and
   when no one wins, display a message about the result being a draw).
5. [ ] Display the location for each move in the format (row, col) in the move
   history list.
